const { Outlet, Link } = ReactRouterDOM
import {BookList} from "../cmps/BookList.jsx"

export function AboutUs() {

    return (
        <section className="about">
            <h1>Something something books something books</h1>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Optio dolore sapiente, iste animi corporis nisi atque tempora assumenda dolores. Nobis nam dolorem rerum illo facilis nemo sit voluptatibus laboriosam necessitatibus!</p>
            <section>
                <Outlet />
            </section>
        </section>
    )
}