//import React from 'react';

import { ReactNode } from 'react';
import '../styles/ContentItem.css';

interface ContenItemProps {
  heading: string;
  children : string | ReactNode;
}

const ContentItem = ({heading, children}: ContenItemProps) => {
  return ( 
    <>
    <div className="item">
            <div className="details">
                <h3> {heading}</h3>
                <div>
                  {children}
                </div>
            </div>
        </div>
    </>
  )
}

export default ContentItem



