import { templates } from "@/Data/templates"
import { Link, NavLink } from "react-router"

const Templates = () => {
    console.log(templates)
    return <div className="p-10">
        <h1 className="text-4xl font-bold mb-10">Templates</h1>
        <div className="flex justify-end my-5">
            <NavLink to="/templates/create-template">
            <button className="h-[30px]  rounded text-white font-medium bg-black px-2 text-sm cursor-pointer">Add new Template</button>
            </NavLink>
        </div>
         {templates.map(template => (
            <div id={template.id} className="flex justify-between mb-10 rounded-md">
            <div className="w-[50%] p-10 border border-slate-300 rounded">
                <h1 className="text-xl font-bold">{template.title}</h1>
                <p>{template.description}</p>
                <button className="h-[30px] px-2 rounded text-white font-medium bg-black mt-5 text-sm">
                    <Link to= {`/templates/${template.id}`} >
                    View Template
                    </Link>
                </button>
            </div>
            <div className="w-[50%] bg-slate-200 p-5">
                {Object.keys(template.files).map(eachKey => (
                    <p>{eachKey}</p>
                ))}
            </div>
        </div>
         ))}
    </div>
}

export default Templates