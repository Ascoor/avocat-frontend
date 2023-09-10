import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './TextEditor.css';

export default function TextEditor(props) {
  const MAX_LENGTH = 800;
  const [text, setText] = useState('');

  const [isReadMore, setIsReadMore] = useState(true);

  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  const handleUpClick = () => {
    let newText = text.toUpperCase();
    setText(newText);
    props.showAlert('Converted to UPPERCASE!', 'success');
  };

  const handleLoClick = () => {
    let newText = text.toLowerCase();
    setText(newText);
    props.showAlert('Converted to lowercase!', 'success');
  };

  const handleSentanCaseClick = () => {
    let removeWhitespace = document
      .getElementById('textArea')
      .value.trimStart();
    let newText =
      removeWhitespace.charAt(0).toUpperCase() + removeWhitespace.slice(1);
    setText(newText);
    props.showAlert('Converted to Sentence case!', 'success');
  };

  const handleCopyClick = () => {
    navigator.clipboard.writeText(text);
    props.showAlert('Copied to Clipboard!', 'success');
  };

  const handleExtraSpaceClick = () => {
    let newText = text.split(/[ ]+/);
    setText(newText.join(' '));
    props.showAlert('Extra Spaces Removed!', 'success');
  };

  const handleClearClick = () => {
    let newText = '';
    setText(newText);
    props.showAlert('Text Cleared!', 'success');
  };

  const handleCapitCaseClick = () => {
    let removeWhitespace = document
      .getElementById('textArea')
      .value.trimStart();
    let splitText = [];
    splitText = removeWhitespace.split(' ');

    // Use map to capitalize the first letter of each word
    let capitalizedText = splitText.map((word) => {
      if (word.length > 0) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      }
      return word; // Return empty strings as they are
    });

    let newText = capitalizedText.join(' '); // Join the words back into a string
    setText(newText);
    props.showAlert('Converted to Capitalized Case!', 'success');
  };

  const handleOnChange = (event) => {
    setText(event.target.value);
  };

  return (
    <>
      <div
        className="container"
        style={{ color: props.mode === 'dark' ? 'white' : '#00101C' }}
      >
        <h4>{props.label}</h4>
        <div className="mb-6 textwidth">
          <textarea
            className="form-control my-2 border"
            value={text}
            onChange={handleOnChange}
            style={{
              backgroundColor: props.mode === 'dark' ? '#00101C' : 'white',
              color: props.mode === 'dark' ? 'white' : '#00101C',
            }}
            id="textArea"
            rows="8"
          ></textarea>
          <button
            type="button"
            disabled={text.length === 0}
            className="btn btn-primary btn-sm mx-1 my-1 bgcolor"
            onClick={handleUpClick}
          >
            UPPERCASE
          </button>
          <button
            type="button"
            disabled={text.length === 0}
            className="btn btn-primary btn-sm mx-1 my-1 bgcolor"
            onClick={handleLoClick}
          >
            lowercase
          </button>
          <button
            type="button"
            disabled={text.length === 0}
            className="btn btn-primary btn-sm mx-1 my-1 bgcolor"
            onClick={handleClearClick}
          >
            Clear
          </button>
          <button
            type="button"
            disabled={text.length === 0}
            className="btn btn-primary btn-sm mx-1 my-1 bgcolor"
            onClick={handleCopyClick}
          >
            Copy to Clipboard
          </button>
          <button
            type="button"
            disabled={text.length === 0}
            className="btn btn-primary btn-sm mx-1 my-1 bgcolor"
            onClick={handleExtraSpaceClick}
          >
            Remove Extra Space
          </button>
          <button
            type="button"
            disabled={text.length === 0}
            className="btn btn-primary btn-sm mx-1 my-1 bgcolor"
            onClick={handleSentanCaseClick}
          >
            Sentence Case
          </button>
          <button
            type="button"
            className="btn btn-primary mx-1"
            onClick={handleCapitCaseClick}
          >
            Capitalized Case
          </button>
        </div>
      </div>
      <div
        className="section-media"
        style={{
          color: props.mode === 'dark' ? 'white' : 'black',
          border: props.mode === 'dark' ? 'white' : '#183d72 solid 1px',
        }}
      >
        <section>
          <div className="ib">
            <h4 className="align">Text Summary</h4>
            <p className="padding-left">
              {
                text.split(/\s+/).filter((element) => element.length !== 0)
                  .length
              }{' '}
              words | {text.length} characters
            </p>
            <p className="padding-left">
              {0.008 *
                text.split(' ').filter((element) => element.length !== 0)
                  .length}{' '}
              minutes to read slow
            </p>
            <p className="padding-left">
              {0.0022 *
                text.split(' ').filter((element) => element.length !== 0)
                  .length}{' '}
              minutes to read fast
            </p>
          </div>
          <div className="ib">
            <h4 className="align">Preview</h4>
            <p className="text">
              {isReadMore ? text.slice(0, MAX_LENGTH) : text}
              {text.length === 0 ? 'Noting to preview!' : ''}
              {text.length > MAX_LENGTH ? (
                <span onClick={toggleReadMore} className="read-or-hide">
                  {isReadMore ? '...read more' : ' show less'}
                </span>
              ) : (
                ''
              )}
            </p>
          </div>
        </section>
      </div>
    </>
  );
}

TextEditor.propTypes = {
  label: PropTypes.string.isRequired,
};

TextEditor.defaultProps = {
  label: 'Set label here',
};
