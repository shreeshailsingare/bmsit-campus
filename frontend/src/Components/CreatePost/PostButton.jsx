import {Link} from "react-router-dom";
function PostButton(){
    return(
       <Link to="/createpost"
            className="btn btn-primary rounded-circle shadow position-fixed d-flex align-items-center justify-content-center"
            style={{
                bottom: "60px",
                right: "20px",
                width: "56px",
                height: "56px",
                zIndex: 1050,
            }}
            >
            <i className="fa-solid fa-plus fs-4"></i>
        </Link>

            

 
    )
}

export default PostButton;