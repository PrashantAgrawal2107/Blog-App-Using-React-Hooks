import { useState , useRef, useEffect} from "react";

//Blogging App using Hooks
export default function Blog(){

    // const [title , setTitle] = useState("");
    // const [content , setContent] = useState("");
    const [formData , setFormData] = useState({title : "" , content : ""});
    const [blogs , setBlogs] = useState([]);
    const titleRef = useRef(null);

    // To focus on title field on componentDidMount...ie ... at the first render
    useEffect(()=>{
        titleRef.current.focus();
    },[])

    //Passing the synthetic event as argument to stop refreshing the page on submit
    function handleSubmit(e){
        e.preventDefault();
        console.log(blogs);
        // setBlogs({title , content});   // Previous items will be lost
        setBlogs([{title : formData.title , content : formData.content},...blogs]);  // Using REST operator to get previous items as it is.
        // setTitle("");
        // setContent("");
        setFormData({title:"",content:""})
        titleRef.current.focus(); // To set the focus to title field on submitting the blog.
    }

    function removeBlog(index){
        // setBlogs(blogs.filter((blog,i)=>index!==i));
        blogs.splice(index , 1);
        setBlogs([...blogs]);
    }

    return(
        <>
        {/* Heading of the page */}
        <h1>Write a Blog!</h1>

        {/* Division created to provide styling of section to the form */}
        <div className="section">

        {/* Form for to write the blog */}
            <form onSubmit={handleSubmit}>

                {/* Row component to create a row for first input field */}
                <Row label="Title">
                        <input className="input"
                                placeholder="Enter the Title of the Blog here.." 
                                value={formData.title} 
                                ref = {titleRef}
                                onChange={(e)=> setFormData({title : e.target.value , content : formData.content})}
                        />
                </Row >

                {/* Row component to create a row for Text area field */}
                <Row label="Content">
                        <textarea className="input content"
                                placeholder="Content of the Blog goes here.."
                                value={formData.content}
                                onChange={(e)=> setFormData({title : formData.title , content : e.target.value})}
                        />
                </Row >

                {/* Button to submit the blog */}            
                <button className = "btn">ADD</button>
            </form>
                     
        </div>

        <hr/>

        {/* Section where submitted blogs will be displayed */}
        <h2> Blogs </h2>
        {blogs.map((blog , i)=>(
            <div className="blog" key={i}>
                <h3>{blog.title}</h3>
                <p>{blog.content}</p>
                <div className="blog-btn">
                    <button onClick={()=>removeBlog(i)} className="btn remove">
                        Delete
                    </button>
                </div>
            </div>
        ))}
        </>
        )
    }

//Row component to introduce a new row section in the form
function Row(props){
    const{label} = props;
    return(
        <>
        <label>{label}<br/></label>
        {props.children}
        <hr />
        </>
    )
}
