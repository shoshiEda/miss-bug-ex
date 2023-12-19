


export function CarFilter(){


    return(
        <section className="car-filter main-layout full">
        <h2>Filter Our Cars</h2>
        <form>
            <label>title: </label>
            <input type="text"/>

            <label>severity: </label>
            <input type="number" />

            <button>Submit</button>
        </form>
    </section>
    )
}