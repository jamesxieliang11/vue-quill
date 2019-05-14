<template>
  <div class="quill-editor-example">
    <!-- quill-editor -->
    <quill-editor
      ref="myTextEditor"
      v-model="content"
      :options="editorOption"
      @blur="onEditorBlur($event)"
      @focus="onEditorFocus($event)"
      @ready="onEditorReady($event)"
    ></quill-editor>
  </div>
</template>

<script>
/* eslint-disable */
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";
import Quill from "quill";

import hljs from "highlight.js";
const Link = Quill.import("formats/link");
class MyLink extends Link {
  static create(value) {
    let node = super.create(value);
    value = this.sanitize(value);
    if (!(value.indexOf("http://") === 0 || value.indexOf("https://") === 0)) {
      value = "http://" + value;
    }
    node.setAttribute("href", value);
    return node;
  }
}
Quill.register(MyLink, true);

const Parchment = Quill.import("parchment");
const pixelLevels = ["small", "large", "huge"];
class lineHeightAttributor extends Parchment.Attributor.Class {}

const lineHeightStyle = new lineHeightAttributor(
  "lineHeight",
  "ql-lineHeight",
  {
    scope: Parchment.Scope.INLINE,
    whitelist: pixelLevels
  }
);

Quill.register({ "formats/lineHeight": lineHeightStyle }, true);

export default {
  data() {
    return {
      name: "01-example",
      content: `<h2 class="ql-align-center"><span class="ql-font-serif">Text content loading..</span></h2>`,
      editorOption: {
        modules: {
          toolbar: {
            container: [
              "bold",
              "italic",
              "underline",
              "strike",
              "blockquote",
              "code-block",
              { header: [1, 2, 3, 4, 5, 6, false] },
              { lineHeight: ["small", "large", "huge"] } //新添加的工具
            ],
            handlers: {
              lineHeight: function(e) {
                //添加工具方法
                console.log(this)
                let Range = this.quill.getSelection();
                this.quill.formatText(
                  Range.index,
                  Range.length,
                  "lineHeight",
                  e
                );
              }
            } // 事件重写
          },
          syntax: {
            highlight: text => hljs.highlightAuto(text).value
          }
        }
      }
    };
  },
  components: {
    quillEditor
  },
  methods: {
    onEditorBlur(editor) {
      console.log("editor blur!", editor);
    },
    onEditorFocus(editor) {
      console.log("editor focus!", editor);
    },
    onEditorReady(editor) {
      console.log("editor ready!", editor);
    }
  },
  computed: {
    editor() {
      return this.$refs.myTextEditor.quill;
    },
    contentCode() {
      return hljs.highlightAuto(this.content).value;
    }
  },
  mounted() {
    console.log("this is my editor", this.editor);
    setTimeout(() => {
      this.content = `<h1 class="ql-align-center">
                          <span class="ql-font-serif" style="background-color: rgb(240, 102, 102); color: rgb(255, 255, 255);"> I am Example 1! </span>
                        </h1>
                        <p><br></p>
                        <p><span class="ql-font-serif">W Can a man still be brave if he's afraid? That is the only time a man can be brave. </span></p>
                        <p><br></p>
                        <p><strong class="ql-font-serif ql-size-large">Courage and folly is </strong><strong class="ql-font-serif ql-size-large" style="color: rgb(230, 0, 0);">always</strong><strong class="ql-font-serif ql-size-large"> just a fine line.</strong></p>
                        <p><br></p>
                        <p><u class="ql-font-serif">There is only one God, and his name is Death. And there is only one thing we say to Death: "Not today."</u></p>
                        <p><br></p>
                        <p><em class="ql-font-serif">Fear cuts deeper than swords.</em></p>
                        <p><br></p>
                        <pre class="ql-syntax" spellcheck="false">const a = 10;<br>const editorOption = { highlight: text => hljs.highlightAuto(text).value };</pre>
                        <p><br></p>
                        <p><span class="ql-font-serif">Every flight begins with a fall.</span></p>
                        <p><br></p>
                        <p><a href="https://surmon.me/" target="_blank" class="ql-font-serif ql-size-small" style="color: rgb(230, 0, 0);"><u>A ruler who hides behind paid executioners soon forgets what death is. </u></a></p>
                        <p><br></p>
                        <iframe class="ql-video ql-align-center" frameborder="0" allowfullscreen="true" src="https://www.youtube.com/embed/QHH3iSeDBLo?showinfo=0" height="238" width="560"></iframe>
                        <p><br></p>
                        <p><span class="ql-font-serif">Hear my words, and bear witness to my vow. Night gathers, and now my watch begins. It shall not end until my death. I shall take no wife, hold no lands, father no children. I shall wear no crowns and win no glory. I shall live and die at my post. I am the sword in the darkness. I am the watcher on the walls. I am the fire that burns against the cold, the light that brings the dawn, the horn that wakes the sleepers, the shield that guards the realms of men. I pledge my life and honor to the Night’s Watch, for this night and all the nights to come.</span></p>
                        <p><br></p>
                        <p><span class="ql-font-serif">We are born to suffer, to suffer can make us strong.</span></p>
                        <p><br></p>
                        <p><span class="ql-font-serif">The things we love destroy us every time.</span></p>
                        `;
    }, 1300);
  }
};
</script>

<style>
.quill-code {
  border: none;
  height: auto;
}
.quill-code > code {
  width: 100%;
  margin: 0;
  padding: 1rem;
  border: 1px solid #ccc;
  border-top: none;
  border-radius: 0;
  height: 10rem;
  overflow-y: auto;
  resize: vertical;
}
.ql-toolbar {
  text-align: left;
}

.ql-lineHeight {
  margin-left: 45px;
}
.ql-lineHeight::before {
  content: "行内：";
  position: relative;
  top: 2px;
  left: 8px;
}
.ql-lineHeight .ql-picker-label {
  left: 50px;
  top: -20px;
}
.ql-lineHeight .ql-picker-options {
  left: 50px;
}
.ql-lineHeight-large {
  line-height: 30px;
}

.ql-lineHeight-small {
  line-height: 20px;
}

.ql-lineHeight-huge {
  line-height: 40px;
}

.ql-picker.ql-lineHeight .ql-picker-label::before,
.ql-picker.ql-lineHeight .ql-picker-item::before {
  content: "正常";
}
.ql-picker.ql-lineHeight .ql-picker-label[data-value="small"]::before,
.ql-picker.ql-lineHeight .ql-picker-item[data-value="small"]::before {
  content: "小";
}
.ql-picker.ql-lineHeight .ql-picker-label[data-value="large"]::before,
.ql-picker.ql-lineHeight .ql-picker-item[data-value="large"]::before {
  content: "较大";
}
.ql-picker.ql-lineHeight .ql-picker-label[data-value="huge"]::before,
.ql-picker.ql-lineHeight .ql-picker-item[data-value="huge"]::before {
  content: "最大";
}
</style>