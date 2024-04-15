import { useEffect, useRef, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBold, faItalic, faStrikethrough, faQuoteLeft, faCode, faHeading, faListUl, faListOl, faLink, faImage, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { useDropzone } from "react-dropzone";
import StarterKit from "@tiptap/starter-kit";
import { EditorContent, useEditor } from "@tiptap/react";
import { imageExtension } from './imageExtension';


import { useCtx } from "../../../../hooks/context/useCtx";

function Wysiwyg() {
  // react hooks
  const navigate = useNavigate();
  const location = useLocation();
  // const { category, product } = location?.state;
  const category = location?.state?.category || navigate('/dashboard');
  const product = location?.state?.product;
  const fileInputRef = useRef(null);

  // global state
  const { ctx } = useCtx();

  // local state
  const [image, setImage] = useState(null);
  const [uuid, setUuid] = useState(product?.uuid || crypto.randomUUID());
  const [title, setTitle] = useState(product?.title || '');
  const [price, setPrice] = useState(product?.price || 0.0);
  const [errMsg, setErrMsg] = useState('');

  const editor = useEditor({
    extensions: [
      StarterKit,
      imageExtension(file => upload(file)),
    ],
    content: product?.description || '[describe your product]'
  });

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      setImage(acceptedFiles[0]);
      upload(acceptedFiles[0], true);
    }
  });

  useEffect(() => {
    console.log(product);
    async function loadPrimaryImage() {
      try {
        const res = await ctx.axios.get(`products/${uuid}/images/${product?.primaryImageFilename}`, {
          responseType: 'arraybuffer'
        });
        const contentType = res.headers['content-type'];
        setImage(new Blob([res.data], { type: contentType }));
      } catch (err) {
        if (!err.response) {
          setErrMsg('No server response');
        } else if (err.response.status === 404) {
          return; // good, new product
        } else {
          setErrMsg('receiving product primary image failed');
        }
      }
    }
    loadPrimaryImage();
  }, []);

  useEffect(() => {
    if (editor) return;
    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        const { from, to, $from, $to } = editor.state.selection;

        if ($from.parent.type.name === 'list_item' && $to.parent.type.name === 'list_item') {
          editor.chain().focus().splitListItem().run();

          if ($from.parent.textContent === '') {
            editor.chain().focus().deleteRange($from.pos, $to.pos).run();
          }
        }
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [editor])

  useEffect(() => {
    setErrMsg('');
  }, [title, price])

  async function upload(file, isPrimary = false) {
    const formData = new FormData();
    formData.append('image', file);
    const res = await ctx.axios.post(`/dashboard/products/${uuid}/images?${isPrimary ? 'isPrimary=true' : 'isPrimary=false'}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    console.log(res.data);
    return res.data;
  }

  async function onSave() {
    console.log(uuid, title, price);
    try {
      await ctx.axios.post("/dashboard/products", { category, uuid, title, price, description: editor.getHTML() });
      navigate('/dashboard/products');
    } catch (err) {
      if (!err.response) {
        setErrMsg('No server response');
      } else if (err.response.status === 400) {
        setErrMsg('All fields are required [title, image, description, price]. But some where missing (for example image). Please fill all information')
      } else if (err.response.status === 403) {
        setErrMsg('Unauthorizhed: navigate to products from dashboard (by clicking), not from url link')
      } else {
        setErrMsg('product upload failure');
      }
    }
  }

  return (
    <div className="h-screen overflow-auto flex justify-center items-center ">
      <div className="w-[80%] m-auto flex flex-col gap-[2rem] border border-gray-299 p-[1rem] mt-[1rem]">
        <span className={errMsg ? 'w-full rounded bg-red-200 text-red-700 font-medium mb-2 p-2' : 'hidden'}>{errMsg}</span>
        <h1 className="mx-auto font-2xl font-bold py-[1rem]">Product in <span className="uppercase">{category}</span> category</h1>
        <div>
          <label htmlFor="image">Image</label>
          <div {...getRootProps()} className="border border-dashed border-gray-300 p-[1rem] cursor-pointer">
            <input {...getInputProps()} />
            {image ? (
              <img src={URL.createObjectURL(image)} />
            ) : (
              <span>Drag 'n' drop an product image here, or click to select one</span>
            )}
          </div>
        </div>
        <div>
          <label htmlFor="title">Title</label>
          <input
            id='title'
            type='text'
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 mt-1 mb-2 focus:outline-none"
          />
        </div>
        <div className="flex flex-col gap-[1rem]">
          <input
            id='description'
            ref={fileInputRef}
            type='file'
            accept='image/*'
            className="hidden"
            onChange={async e => {
              const file = e.target.files[0];
              if (file) {
                const filename = await upload(file, false);
                const src = `${ctx.baseURL}/products/${uuid}/images/${filename}`;
                const node = editor.state.schema.nodes.image.create({ src });
                const transaction = editor.state.tr.replaceSelectionWith(node);
                editor.view.dispatch(transaction);
                editor.commands.focus();
              }
            }}
          />
          <div className="flex gap-[1rem]">
            <button onClick={() => editor.chain().focus().toggleBold().run()}>
              <FontAwesomeIcon icon={faBold} />
            </button>
            <button onClick={() => editor.chain().focus().toggleItalic().run()}>
              <FontAwesomeIcon icon={faItalic} />
            </button>
            <button onClick={() => editor.chain().focus().toggleStrike().run()}>
              <FontAwesomeIcon icon={faStrikethrough} />
            </button>
            <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>
              <FontAwesomeIcon icon={faHeading} />
            </button>
            <button onClick={() => editor.chain().focus().toggleBlockquote().run()}>
              <FontAwesomeIcon icon={faQuoteLeft} />
            </button>
            <button onClick={() => editor.chain().focus().toggleCode().run()}>
              <FontAwesomeIcon icon={faCode} />
            </button>
            <button onClick={() => editor.chain().focus().toggleBulletList().run()}>
              <FontAwesomeIcon icon={faListUl} />
            </button>
            <button onClick={() => editor.chain().focus().toggleOrderedList().run()}>
              <FontAwesomeIcon icon={faListOl} />
            </button>
            <button onClick={() => editor.chain().focus().liftListItem('listItem').run()}>
              <FontAwesomeIcon icon={faArrowUp} />
            </button>
            <button onClick={() => fileInputRef.current.click()}>
              <FontAwesomeIcon icon={faImage} />
            </button>
          </div>
          {editor && <EditorContent editor={editor} className="prose max-w-none focus:outline-none" />}
        </div>
        <div className="w-full flex flex-col">
          <label htmlFor="price">Price</label>
          <div className="flex justify-between">
            <input
              type="number"
              id='price'
              value={price}
              onChange={e => setPrice(e.target.value)}
              className="w-1/2 border border-gray-300 rounded px-3 py-2 focus:outline-none"
            />
            <button onClick={onSave} className="bg-green-500 rounded text-white px-4 py-2">Save</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Wysiwyg