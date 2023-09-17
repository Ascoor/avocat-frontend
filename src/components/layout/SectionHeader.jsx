import React from 'react';
import { Button } from 'react-bootstrap';

import { TiArrowBackOutline } from 'react-icons/ti';
const SectionHeader = ({ buttonName, listName, setShowAddModal }) => {
    return (
        <div className="section-card-header">
          <div className="title-row">
            قائمة {listName}
          </div>
          <div className="button-row">
            <button className='add-btn' onClick={() => setShowAddModal(true)}>
              اضافة {buttonName}
            </button>

          </div>

          <button className='back-btn'
            onClick={() => window.history.back()}
          >
            <TiArrowBackOutline size={25} style={{ marginRight: '0.5rem' }} />
            رجوع
          </button>

        </div>
      );
    };
    
export default SectionHeader;
