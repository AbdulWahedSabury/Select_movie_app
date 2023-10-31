import { useEffect, useRef } from "react";

export default function Search({ query, setQuery }) {
  const input = useRef(null);
  useEffect(function(){
    function callback(e){
      if(document.activeElement === input.current) return;
      if(e.code === "Enter"){
        setQuery('');
        input.current.focus();
      }
    }

    document.addEventListener('keydown', callback)
  },[]);

    return (
      <input
        className="search"
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        ref={input}
      />
    );
  }