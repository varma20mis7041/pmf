import { templates } from "@/Data/templates"

const Templates = () => {
    console.log(templates)
    return <div className="p-10">
        <h1 className="text-4xl font-bold mb-10">Templates</h1>
         {templates.map(template => (
            <div id={template.id} className="flex justify-between mb-10 rounded-md">
            <div className="w-[50%] p-10 border border-slate-300 rounded">
                <h1 className="text-xl font-bold">{template.title}</h1>
                <p>{template.description}</p>
                <button className="h-[30px] w-[120px] rounded text-white font-medium bg-black mt-5 text-sm">View Template</button>
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