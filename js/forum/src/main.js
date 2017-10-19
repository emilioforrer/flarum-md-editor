import app from 'flarum/app';
import {extend} from 'flarum/extend';
import ComposerBody from 'flarum/components/ComposerBody';
import EnhancedTextEditor from './components/EnhancedTextEditor';


app.editor = {
  defaults: {
      // You can only add one of foreColor/backColor
      svgPath:  "/assets/extensions/emilioforrer-markdown-editor/images/icons.svg",
      btnsAdd: ['preformatted', 'noembed','insertAudio'],
      btns: [
          ['viewHTML'],
          ['undo', 'redo'],
          ['formatting'],
          'btnGrp-semantic',
          ['superscript', 'subscript'],
          ['link'],
          ['insertImage'],
          ['noembed'],
          ['insertAudio'],
          'btnGrp-justify',
          'btnGrp-lists',
          ['horizontalRule'],
          ['removeformat'],
          ['preformatted'],
          ['fullscreen']
      ]
  }
}

app.initializers.add('emilioforrer-mdeditor', () => {



    extend(ComposerBody.prototype, 'init', function init() {
      this.editor = new EnhancedTextEditor({
            submitLabel: this.props.submitLabel,
            placeholder: this.props.placeholder,
            onchange: this.content,
            onsubmit: this.onsubmit.bind(this),
            value: this.content(),
        });
    });
});
