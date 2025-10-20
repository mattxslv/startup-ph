import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';

type Props = {
  onChange: (newValue: string) => void,
  value: string
}

const MODULES = {
  toolbar: [
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    ['link'],
    ['clean'],
  ]
}

function htmlToDelta(html: string) {
  const div = document.createElement('div');
  div.setAttribute('id', 'htmlToDelta');
  div.innerHTML = `<div id="quillEditor" style="display:none">${html}</div>`;
  document.body.appendChild(div);
  const quill = new Quill('#quillEditor', {
    theme: 'snow',
  });
  const delta = quill.getContents();
  const el = document.getElementById('htmlToDelta')
  if (el) el.remove();
  return delta;
}

function InlineRichtext({ onChange, value }: Props) {
  return (
    <div>
      <ReactQuill
        modules={MODULES}
        theme="snow"
        defaultValue={htmlToDelta(value)}
        onChange={onChange}
      />
    </div>
  )
}

export default InlineRichtext