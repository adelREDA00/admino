import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function EditorFull({qcontent,handleEditorChange,openEditor,handleCloseEditor}) {

  return (
    <div className='write_mode' >
      <Dialog   open={openEditor}
        onClose={handleCloseEditor} fullWidth maxWidth="md">
        <div >
          <ReactQuill
            value={qcontent}
            onChange={handleEditorChange}
            modules={{
              toolbar: [
                [{ header: [1, 2, 3, 4, 5, 6, false] }],
                ['bold', 'italic', 'underline', 'strike'],
                [{ color: [] }, { background: [] }],
                [{ font: [] }],
                [{ align: [] }],
                ['blockquote', 'code-block'],
                [{ list: 'ordered' }, { list: 'bullet' }],
                ['link', 'image', 'video'],
                ['clean'],
              ],
            }}
            formats={[
              'header',
              'bold',
              'italic',
              'underline',
              'strike',
              'color',
              'background',
              'font',
              'align',
              'blockquote',
              'code-block',
              'list',
              'bullet',
              'link',
              'image',
              'video',
            ]}
            style={{ height: '100vh', width: '100%' }}
            placeholder="Écrivez le contenu de votre article..."
          />
        </div>
      </Dialog>
    </div>
  );
}
