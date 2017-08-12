import listItems from 'flarum/helpers/listItems';
import trumbowyg from 'trumbowyg';
import TextEditor from 'flarum/components/TextEditor';

export default class EnhancedTextEditor extends TextEditor {

   view() {
       return (
           <div className="TextEditor">
               <div id="wmd-button-bar"/>
               <div id="md-editor"/>
               <textarea className="FormControl Composer-flexible"
                   config={this.configTextarea.bind(this)}
                   oninput={m.withAttr('value', this.oninput.bind(this))}
                   placeholder={this.props.placeholder || ''}
                   disabled={!!this.props.disabled}
                   value={this.value()}/>

               <ul className="TextEditor-controls Composer-footer">
                   {listItems(this.controlItems().toArray())}
               </ul>
           </div>
       );
   }

   configTextarea(element, isInitialized) {

        if (isInitialized){
          return;
        };
        var el =   $(element);
        var editor =  $(element).prev();
        var that = this;
        const handler = () => {
          this.onsubmit();
          m.redraw();
        };

        if (editor.data().trumbowyg === undefined) {
          editor.trumbowyg({
              // You can only add one of foreColor/backColor
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
          });
        }

        editor.trumbowyg('html', el.val());

        el.bind('keydown', 'meta+return', handler);
        el.bind('keydown', 'ctrl+return', handler);
        el.hide();
        // $("#".el.attr("id")).val(editor.trumbowyg('html'));
        editor.trumbowyg().off('tbwchange');
        editor.trumbowyg().on('tbwchange', function(e){
          //  $("#".el.attr("id")).val(editor.trumbowyg('html'));
          //  el.trigger("change");
          // console.log(toMarkdown);
          var value = toMarkdown(editor.trumbowyg('html'));
           that.setValue(value);
        });
   }

   oninput(value) {
     this.value(value);

     this.props.onchange(this.value());

     m.redraw.strategy('none');
   }

}
