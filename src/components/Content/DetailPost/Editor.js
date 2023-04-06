import { useState, useRef, useEffect } from 'react';
import ReactQuill from 'react-quill';
import PriButton from '../../Button/PriButton';
const EditorPost = (props) => {
    const editorRef = useRef()
    const { valueEditorCmt, setValueEditorCmt } = props
    useEffect(() => {
        if (valueEditorCmt.includes('<br>') && valueEditorCmt.length === 11) {
            setValueEditorCmt('')
        }
    }, [valueEditorCmt])

    return (
        <div className="containEditor">
            <ReactQuill
                placeholder='Typing for comment'
                ref={editorRef}
                theme="snow"
                value={valueEditorCmt}
                onChange={setValueEditorCmt}

            />
            <div className="btnComment" onClick={(e) => props.handleClickAddCmt(editorRef?.current?.editor?.root?.innerText)}>
                <PriButton disabled={!valueEditorCmt} type="pri" text="Comment" />
            </div>
        </div>

    );
}


export default EditorPost