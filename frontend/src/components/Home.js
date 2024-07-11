import Notes from "./Notes"

const Home = (props) => {

    return (
        <div className="container"> 
            <Notes searchQuery={props.searchQuery} setSearchQuery={props.setSearchQuery}/>
        </div>
    )
}

export default Home