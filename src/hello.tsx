import "./App.css"
import {Box, Flex, Heading} from "@chakra-ui/react";
// import H2 from "./assets/Ragdoll.jpg"


import { useState} from "react";
export default function Advice(){

    const [form, setForm] = useState({
        
        breed: "",
        link: "",
        food: "",
        toy: "",
        advice: ""
    })


    const changeHandler = (e: any)=>{
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const submitHandler = async (e: any)=>{
        e.preventDefault();

        const response = await fetch(import.meta.env.VITE_SERVER_URI  +"cat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                
                breed: e.target.breed.value,
                link: e.target.link.value,
                food: e.target.food.value,
                toy: e.target.toy.value,
                advice: e.target.advice.value
            }),

        });
        const data = await response.json();
        console.log(data)
        setForm({
            
            breed: "",
            link: "",
            food: "",
            toy: "",
            advice: ""
        })
    }


    return <Flex>
        

        <main className="flex-columnav bg-secondary">
    

            <Flex flexDirection={["column", "column", "row"]}
            gap={"20px"}
                  padding={"20px"}
            >
                <Box as={"section"}
                     fontWeight={500}
                     padding={"20px"}
                     id="advice-form" className="p-3">
                    <Heading textAlign={"center"}
                    fontSize={"30px"} color="#22CE83">Cat Advice Submits</Heading>
                    <form method="post"
                         onSubmit={submitHandler}
                         id="book-submit-form" asp-action="Advice" className="d-flex flex-column gap-2"
                    >
                        <fieldset>
                            <label htmlFor="">Where to buy: </label>
                            <input
                                onChange={changeHandler}
                                value={form.link}
                                name="link" type="text" placeholder=""/>
                        </fieldset>



                        <fieldset>
                            <label htmlFor="">Cat Breed:</label>
                            <input onChange={changeHandler}  name="breed" type="text"
                                   value={form.breed}
                                   placeholder=""/>
                        </fieldset>

                        <fieldset>
                            <label htmlFor="">Food Brand:</label>
                            <input onChange={changeHandler} name="food" type="text"
                                   value={form.food}
                                   placeholder=""/>
                        </fieldset>
                        <fieldset>
                            <label htmlFor="">Toy Brand:</label>
                            <input onChange={changeHandler}
                                   value={form.toy} name="toy" type="text" placeholder=""/>
                        </fieldset>
                        <fieldset>
                            <label htmlFor="">Advice:</label>
                            <input
                                value={form.advice}
                                onChange={changeHandler} name="advice" type="text" placeholder=""/>
                        </fieldset>

                        <fieldset>
                            <input className="text-light" type="submit" value="SUBMIT"/>
                        </fieldset>



                    </form>
                </Box>


            </Flex>
        </main>

    </Flex>
}