import { useState , useRef, useEffect, useReducer} from "react";
import { db } from "../firebaseInit";
import { collection, addDoc } from "firebase/firestore"; 
import { getDocs } from "firebase/firestore";
import { doc, onSnapshot } from "firebase/firestore";
import { deleteDoc } from "firebase/firestore";


function blogReducer(state , action){
    switch(action.type){
        case "ADD" :
            return [action.blog , ...state]
        // case "REMOVE":
        //     return state.filter((blog,i)=>action.index!==i);
        case "FETCH":
            return action.blogs;
        default :
           return [];
    }
}

//Blogging App using Hooks
export default function Blog(){

    // const [title , setTitle] = useState("");
    // const [content , setContent] = useState("");
    const [formData , setFormData] = useState({title : "" , content : ""});
    // const [blogs , setBlogs] = useState([]);
    const [blogs , dispatch] = useReducer(blogReducer , []);
    const titleRef = useRef(null);

    // To focus on title field on componentDidMount...ie ... at the first render
    useEffect(()=>{
        titleRef.current.focus();
    },[])

    // To set the title of webpage according to First Blog Title
    useEffect(()=>{
        if(blogs.length && blogs[0].title){
            document.title = blogs[0].title;
        }
        else{
            document.title = "No Blogs!"
        }
    },[blogs])

    // To get all the blogs from database...at initial render
    useEffect(()=>{
        // async function fetchData(){
        //     const querySnapshot = await getDocs(collection(db, "blogs"));
        //     const fetchedBlogs = querySnapshot.docs.map(doc => ({
        //         id: doc.id,
        //         ...doc.data()
        //     }));
        //     // Dispatch an action to update the state with fetched blogs
        //     dispatch({ type: "FETCH", blogs: fetchedBlogs });
            
        // }
        // fetchData();

        const unsub = onSnapshot(collection(db, "blogs"), (querySnapshot) => {
                const fetchedBlogs = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            // Dispatch an action to update the state with fetched blogs
            dispatch({ type: "FETCH", blogs: fetchedBlogs });
            // console.log("Current data: ", doc.data());
        });
    },[])

    //Passing the synthetic event as argument to stop refreshing the page on submit
    async function handleSubmit(e){
        e.preventDefault();
        console.log(blogs);
        // setBlogs({title , content});   // Previous items will be lost
        // setBlogs([{title : formData.title , content : formData.content},...blogs]);  // Using REST operator to get previous items as it is.
       
        dispatch({type : "ADD" , blog : {title : formData.title , content : formData.content}});

        
        // Add a new document with a generated id.
        const docRef = await addDoc(collection(db, "blogs"), {
            title: formData.title,
            content: formData.content,
            createdOn: new Date()
        });
        console.log("Document written with ID: ", docRef.id);

        // setTitle("");
        // setContent("");
        setFormData({title:"",content:""})
        titleRef.current.focus(); // To set the focus to title field on submitting the blog.
    }

    async function removeBlog(id){
        // setBlogs(blogs.filter((blog,i)=>index!==i));

        // blogs.splice(index , 1);
        // setBlogs([...blogs]);
        const docRef = doc(db , "blogs" ,id)
        await deleteDoc(docRef);
        // dispatch({type : "REMOVE" , index : index});
    }
    // const querySnapshot = await getDocs(collection(db, "blogs"));

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
                                required
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
                    <button onClick={()=>removeBlog(blog.id)} className="btn remove">
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
