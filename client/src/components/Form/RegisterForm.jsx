import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import QuestionBox from "./QuestionBox";

const RegisterForm = () => {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    _id: "",
    name: "",
    desc: "",
    deadline: "",
    formFields: [],
    responseCount: 0,
  });
  const [formResponse, setFormResponse] = useState({});
  const [questions, setQuestions] = useState([
    {
      questionText: "Linkedin Link",
      questionType: "text",
      required: true,
    },
    {
      questionText: "Github Link",
      questionType: "text",
      required: true,
    },
    {
      questionText: "Instagram Link",
      questionType: "text",
      required: true,
    },
  ]);
  const [inputValues, setInputValues] = useState(
    Array(questions.length).fill(""),
  );
  const handleInputChange = (e) => {
    setFormResponse({ ...formResponse, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    fetch(
      `${process.env.REACT_APP_BACKEND_BASE_URL}/forms/submit/${params.formId}`,
      {
        method: "POST",
        body: JSON.stringify(formResponse),
      },
    )
      .then((res) => {
        if (res.ok) {
          setFormResponse(null);
        }
      })
      .catch(() => alert("Something Went Wrong.Please Try Again."));
  };

  useEffect(() => {
    const fetchFormData = () => {
      fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/forms/${params.formId}`)
        .then((res) => res.json())
        .then((form) => {
          setFormData(form);
          form.formFields.map((field) => {
            formResponse[field.name] = "";
            setFormResponse({ ...formResponse });
            return null;
          });
        });
    };
    fetchFormData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative flex  w-screen flex-col justify-center">
      <h3 className=" mb-4 mt-10 text-center text-2xl md:text-3xl">
        Register For Event
      </h3>
      <div className="mx-auto mb-48 h-full min-h-screen w-[90%] rounded-xl md:w-[60%]">
        <div className="flex flex-col gap-2 rounded-lg  border border-t-[.5rem] border-blue-800 bg-white p-4 md:p-6">
          <p className="px-2 py-2 text-2xl text-black md:px-4 md:text-4xl">
            {formData.name}
          </p>
          <p className="text-md px-4 text-slate-500 md:py-2">{formData.desc}</p>
        </div>

        {formData.formFields.map((ques, i) => (
          <QuestionBox
            key={i}
            ques={ques}
            inputValue={formResponse[ques.name] ?? "adf"}
            onInputChange={handleInputChange}
          />
        ))}
        <div className="flex justify-center">
          <button
            onClick={handleSubmit}
            className="my-4 w-full cursor-pointer rounded-md bg-blue-500 p-4 px-6 text-white hover:bg-blue-800"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;