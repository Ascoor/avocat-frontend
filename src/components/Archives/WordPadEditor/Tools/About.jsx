// Rename the file to About.jsx
import React from 'react';
import { Link } from "react-router-dom";

export default function About(props) {
    return (
        <>
            <div  style={{color: props.mode==='dark'?'white':'black'}}>
                <h1>About Us</h1>
                {/* ... rest of your JSX code */}
            <p>Text Editor is designed to be a free to use online text manipulator that you can use for efficiency and productivity gains. Whether you have mistakenly written all your text in capital or you want to quickly align the correct capitalisation structure for titles. Text Editor allows you to quickly fix any errors as well as produce an array of outcomes from the tools above.</p>
                {/* <p>There are also a range of converters to explore as well such as the binary code and morse code translators that will allow you to write up standard text and have it translated into the necessary code.</p> */}
                <p>You can also use the text manipulators to allow your text to stand out. Whether that’s for social media purposes or you want to bring some attention to an advertisement, these tools are a great solution for fixing those issues too.</p>
                <p>Of course, if you have any suggestions over new tools that should be added and created that could help benefit, then by all means, please <a href="mailto:diliprk95@gmail.com">get in touch</a> with us and we will be more than happy to help you.</p>
                <p><Link to="/word-editor" className="btn btn-primary">Return to Text Editor</Link></p>
            </div>
        </>
    )
}
