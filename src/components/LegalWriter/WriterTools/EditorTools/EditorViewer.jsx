import React, { Component } from 'react';

class EditorViewer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editorData: this.props.editorData, // Initial data
    };
  }

  componentDidUpdate(prevProps) {
    // Check if editorData prop has changed
    if (prevProps.editorData !== this.props.editorData) {
      // Update the editorData state with the new value
      this.setState({
        editorData: this.props.editorData,
      });
    }
  }

  render() {
    const { editorData } = this.state;

    return (
      <div className="App">
        <h2>Uploaded Document</h2>
        <p>File path: {editorData}</p>
      </div>
    );
  }
}

export default EditorViewer;
