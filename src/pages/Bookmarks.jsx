import { useEffect, useState } from "react";
import API from "../api/api";
import Navbar from "../components/Navbar";

function Bookmarks() {

  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {

    const userId =
      localStorage.getItem("userId");

    API.get(`/bookmarks/user/${userId}`)
      .then(res => {

        setBookmarks(res.data);

      })
      .catch(err => {

        console.log(err);

      });

  }, []);

  return (

    <div>

      <Navbar />

      <h1>My Bookmarks</h1>

      {

        bookmarks.map(resource => (

          <div
            key={resource.id}
            style={{
              border: "1px solid gray",
              margin: "10px",
              padding: "10px"
            }}
          >

            <h3>{resource.title}</h3>

            <p>
              Subject: {resource.subject}
            </p>

          </div>

        ))

      }

    </div>

  );
}

export default Bookmarks;