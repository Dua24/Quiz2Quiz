import { useState, useRef, useEffect } from 'react';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import 'draft-js/dist/Draft.css';
import PriButton from '../../Button/PriButton';
const EditorPost = () => {
    const [editorState, setEditorState] = useState(
        () => EditorState.createEmpty(),
    );
    const ref = useRef()
    const [isDisableBtnCmt, setIsDisableBtnCmt] = useState(true)

    useEffect(() => {
        if (editorState.getCurrentContent().getPlainText()) {
            setIsDisableBtnCmt(false)
        } else {
            setIsDisableBtnCmt(true)
        }
    }, [editorState.getCurrentContent().getPlainText()])

    const handleFocus = () => {
        ref.current.wrapper.style = "border: 1px solid #ccc"
    }

    return (
        <div className="containEditor" onClick={handleFocus}>
            <Editor
                ref={ref}
                editorState={editorState}
                onEditorStateChange={setEditorState}
                hashtag={{
                    separator: ' ',
                    trigger: '#',
                }}
                mention={{
                    separator: ' ',
                    trigger: '@',
                    suggestions: [
                        { text: 'JavaScript', value: 'javascript', url: 'js' },
                        { text: 'Golang', value: 'golang', url: 'go' },
                    ],
                }}
            />
            <div className="btnComment">
                <PriButton disabled={isDisableBtnCmt} type="pri" text="Comment" />
            </div>
        </div>

    );
}


export default EditorPost