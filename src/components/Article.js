import React, { useState, useEffect, useContext } from "react"

import { MdLibraryAdd } from "react-icons/md";
import { BsFillFolderSymlinkFill } from "react-icons/bs";

import { NavLink, Link, useLocation } from "react-router-dom";
import loadable from '@loadable/component'

function Article({ article, bool = true }) {
    function show() {
        console.log('show')
        console.log('show')
        console.log('show')

    }
    return (
        <>
            <div className="article" style={{
                backgroundImage: `url(${(article.img)})`
            }} key={article.id}>
                {bool && (<div className="article-icons">
                    {/* <MdLibraryAdd
                        className="icon"
                       
                        size={30} /> */}
                    <Link
                        to={`/article/${article.id}`}
                    >
                        <BsFillFolderSymlinkFill
                            className="icon"
                            size={30} />
                    </Link>
                </div>
                )}

                <h2>{article.name}</h2>
                <p>{article.describtion}</p>
            </div>

        </>
    );
}

export default Article;