
import "./Alert.css"

export default function Alert(props) {
    const handelUpperCaseClick = (word) =>{
        let newText = word.toLowerCase();
        return newText.charAt(0).toUpperCase() + newText.slice(1);
    } 
    
    return (
        <div style={{height:'45px'}}>
            {props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
                <strong>{handelUpperCaseClick(props.alert.type)} </strong>: {props.alert.msg}
            </div>
            }
        </div>
    )
}
