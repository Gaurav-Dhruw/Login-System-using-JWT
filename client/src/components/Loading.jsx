import React from 'react'

function Loading() {
    return (
        <div style={{height:"100vh", display: "flex", alignItems:"center", justifyContent:"center"}}>
<div class="spinner-border text-light" style={{width: "3rem", height: "3rem"}} role="status">
  <span class="visually-hidden">Loading...</span>
</div>
        </div>
    )
}

export default Loading
