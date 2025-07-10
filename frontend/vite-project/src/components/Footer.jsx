import { useEffect } from "react";

const Footer = ()=>{

    // useEffect(()=>{
    //     data()
    // },[])

    // const data = async()=>{
    //     const res = await fetch('https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.45970&lng=77.02820&is-seo-homepage-enabled=true');
    //     console.log(res);
    // }

    return (
        <div>
            <div className="container-fluid">
                <div className="row fixed-bottom border justify-content-around bg-secondary">
                    <div className="col-md-4">
                       <h4>fsfsffsf</h4>
                       <h4>fsfsffsf</h4>
                       <h4>fsfsffsf</h4>
                    </div>

                    <div className="col-md-4">
                        <ul>
                            <li>contact</li>
                            <li>services</li>
                            <li>metrix</li>
                        </ul>
                    </div>

                    <div className="col-md-4">
                        <ul>
                            <li>contact</li>
                            <li>services</li>
                            <li>metrix</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Footer;

