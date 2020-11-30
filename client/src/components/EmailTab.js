import React, {useState, useRef} from 'react';
import './EmailTab.css'
import deleteicon from '../images/deleteicon.png';
import archiveicon from '../images/archiveicon.jpg';
import reply from '../images/reply.png';
import notreadmail from '../images/notreadmail.png';
import markasread from '../images/markasread.png';

const EmailTab = ({name, subject, isRead, id, emailClickHandler, markAsReadHandler}) => {
    const [isSelected, setIsSelected] = useState(false);
    const iconsContainer = useRef(null);

    const checkboxClickHandler = () => {
        setIsSelected(!isSelected);
    }

    const textClickHandler = () => {
        console.log('textClickHandler');
        emailClickHandler(id);
    }

    const changeIconsContainerDisplay = (enter) => {
        if(enter) {
            iconsContainer.current.style.display = 'flex';
        } else {
            iconsContainer.current.style.display = 'none';
        }
    }

    // console.log('readIcon', readIcon);
    const inlineStyles = isRead ? {} : {backgroundColor: "#ffffff"}

    return <div onMouseOver={() => changeIconsContainerDisplay(true)} onMouseOut={() => changeIconsContainerDisplay(false)} className="emailTabContainer" style={inlineStyles}>
        <input className="emailTabCheckbox" onClick={() => checkboxClickHandler()} type="checkbox" />
        <div className="emailTabTextContainer">
            <div style={{display: "flex", alignItems: "center"}} onClick={() => textClickHandler()} >
                <p className="emailTabSubject">{name}</p>
                <p className="emailTabSnippet">{subject}</p>
            </div>
            <div ref={iconsContainer} style={{display: 'none'}} className="emailTabIconsContainer">
                <img className="emailTabIcon" src={reply} />
                <img className="emailTabIcon" src={archiveicon} />
                <img className="emailTabIcon" src={deleteicon} />
                {isRead ? <img onClick={() => markAsReadHandler(id)} className="emailTabIcon" src={markasread} /> : <img onClick={() => markAsReadHandler(id)} className="emailTabIcon" src={notreadmail} />}
            </div>
        </div>
    </div>;
}
 
export default EmailTab;