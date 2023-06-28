import React from "react";
import '../CSS/Foot.css'

function Foot(){
    return(
        <div className="foot">
            <div className="a_few_words">
                <p>
                    Thank you for taking the time to visit my website! 
                </p>
            </div>
            <div className="digital_footprint">
                <div className="social">
                    <a href="mailto:swapnils3051@gmail.com">
                        <div id="email_icon">
                        </div>
                        <p>swapnils3051@gmail.com</p>
                    </a>
                    
                </div>
                <div className="social">
                    <a href="https://www.linkedin.com/in/swapnil-srivastava-00aba0148/">
                        <div id="LinkedIn_icon">
                        </div>
                        <p>Swapnil Srivastava</p>
                    </a>
                </div>
                <div className="social">
                    <a href="https://github.com/swapnil1198s">
                        <div id="github_icon">
                        </div>
                        <p>swapnil1198s</p>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Foot;