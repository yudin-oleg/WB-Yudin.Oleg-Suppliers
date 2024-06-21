import "./Navbar.css"

function Navbar(){
    return(
        <section className="navigation">
            <div className="icon-menu">
                <img src="../img/icon-menu.svg" alt="icon menu"/>
            </div>
            <div className="sildebar">
                <img src="../img/sildebar.svg" alt="sildebar"/>
            </div>
            <div className="log-doc">
                <div className="icon-log">
                    <img src="../img/icon-log.svg" alt="icon log"/>
                </div>
                <div className="icon-doc">
                    <img src="../img/icon-doc.svg" alt="icon doc"/>
                </div>
            </div>
        </section>
    )
}

export default Navbar;