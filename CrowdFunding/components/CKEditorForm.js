import React, { Component } from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

class CKEditorForm extends Component {
    render() {
        return (
            <div className="CKEditorForm">
                <h2>Campaign Description</h2>
                <CKEditor
                    editor={ ClassicEditor }
                />
            </div>
        );
    }
}

export default CKEditorForm;