import React, { Component } from 'react';
import mammoth from 'mammoth';

class EditorViewer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            editorData: this.props.editorData, // Initial data
        };
    }

    componentDidUpdate(prevProps) {
        // Check if importedDocContent prop has changed
        if (prevProps.importedDocContent !== this.props.importedDocContent) {
            // Update the editorData state with the imported document content
            this.setState({
                editorData: this.props.importedDocContent,
            });
        }
    }

    render() {
        const { editorData } = this.state;

        return (
            <div className="App">
                <h2>Using mammoth.js for DOCX to HTML in React</h2>
                <div
                    dangerouslySetInnerHTML={{ __html: editorData }}
                    style={{ direction: 'rtl', textAlign: 'right' }} // For RTL support
                />
            </div>
        );
    }
}

export default EditorViewer;
