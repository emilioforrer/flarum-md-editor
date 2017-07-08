'use strict';

System.register('emilioforrer/mdeditor/components/EnhancedTextEditor', ['flarum/helpers/listItems', 'trumbowyg', 'flarum/components/TextEditor'], function (_export, _context) {
    "use strict";

    var listItems, trumbowyg, TextEditor, EnhancedTextEditor;
    return {
        setters: [function (_flarumHelpersListItems) {
            listItems = _flarumHelpersListItems.default;
        }, function (_trumbowyg) {
            trumbowyg = _trumbowyg.default;
        }, function (_flarumComponentsTextEditor) {
            TextEditor = _flarumComponentsTextEditor.default;
        }],
        execute: function () {
            EnhancedTextEditor = function (_TextEditor) {
                babelHelpers.inherits(EnhancedTextEditor, _TextEditor);

                function EnhancedTextEditor() {
                    babelHelpers.classCallCheck(this, EnhancedTextEditor);
                    return babelHelpers.possibleConstructorReturn(this, (EnhancedTextEditor.__proto__ || Object.getPrototypeOf(EnhancedTextEditor)).apply(this, arguments));
                }

                babelHelpers.createClass(EnhancedTextEditor, [{
                    key: 'view',
                    value: function view() {
                        return m(
                            'div',
                            { className: 'TextEditor' },
                            m('div', { id: 'wmd-button-bar' }),
                            m('div', { id: 'md-editor' }),
                            m('textarea', { className: 'FormControl Composer-flexible',
                                config: this.configTextarea.bind(this),
                                oninput: m.withAttr('value', this.oninput.bind(this)),
                                placeholder: this.props.placeholder || '',
                                disabled: !!this.props.disabled,
                                value: this.value() }),
                            m(
                                'ul',
                                { className: 'TextEditor-controls Composer-footer' },
                                listItems(this.controlItems().toArray())
                            )
                        );
                    }
                }, {
                    key: 'configTextarea',
                    value: function configTextarea(element, isInitialized) {
                        var _this2 = this;

                        if (isInitialized) return;
                        var el = $(element);
                        var editor = $(element).prev();
                        var that = this;
                        var handler = function handler() {
                            _this2.onsubmit();
                            m.redraw();
                        };

                        el.bind('keydown', 'meta+return', handler);
                        el.bind('keydown', 'ctrl+return', handler);
                        el.hide();
                        // $("#".el.attr("id")).val(editor.trumbowyg('html'));
                        editor.trumbowyg().off('tbwchange');
                        editor.trumbowyg().on('tbwchange', function (e) {
                            //  $("#".el.attr("id")).val(editor.trumbowyg('html'));
                            //  el.trigger("change");
                            // console.log(toMarkdown);
                            var value = toMarkdown(editor.trumbowyg('html'));
                            that.setValue(value);
                        });
                    }
                }]);
                return EnhancedTextEditor;
            }(TextEditor);

            _export('default', EnhancedTextEditor);
        }
    };
});;
'use strict';

System.register('emilioforrer/mdeditor/main', ['flarum/app', 'flarum/extend', 'flarum/components/ComposerBody', './components/EnhancedTextEditor'], function (_export, _context) {
    "use strict";

    var app, extend, ComposerBody, EnhancedTextEditor;
    return {
        setters: [function (_flarumApp) {
            app = _flarumApp.default;
        }, function (_flarumExtend) {
            extend = _flarumExtend.extend;
        }, function (_flarumComponentsComposerBody) {
            ComposerBody = _flarumComponentsComposerBody.default;
        }, function (_componentsEnhancedTextEditor) {
            EnhancedTextEditor = _componentsEnhancedTextEditor.default;
        }],
        execute: function () {

            app.initializers.add('emilioforrer-mdeditor', function () {

                extend(ComposerBody.prototype, 'init', function init() {
                    this.editor = new EnhancedTextEditor({
                        submitLabel: this.props.submitLabel,
                        placeholder: this.props.placeholder,
                        onchange: this.content,
                        onsubmit: this.onsubmit.bind(this),
                        value: this.content()
                    });
                });
            });
        }
    };
});