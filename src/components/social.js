import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Social = () => {
    return (
        <ul className="navbar-nav sm-icons">
            <li className="nav-item"><a className="nav-link" href="https://linkedin.com/in/joaquinayuso"><FontAwesomeIcon icon={["fab", "linkedin"]} /></a></li>
            <li className="nav-item"><a className="nav-link" href="https://twitter.com/joaxap"><FontAwesomeIcon icon={["fab", "twitter"]} /></a></li>
            <li className="nav-item"><a className="nav-link" href="https://github.com/joax"><FontAwesomeIcon icon={["fab", "github"]} /></a></li>
            <li className="nav-item"><a className="nav-link" href="https://discord.com/"><FontAwesomeIcon icon={["fab", "discord"]} /> joaxap.eth</a></li>
        </ul>   
    )
}

export default Social