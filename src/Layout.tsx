import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Box, Button, Link } from "@chakra-ui/react";

export default function Layout() {
    const navigate = useNavigate()
    const [user, setUser] = useState({});

    useEffect(() => {
        let parseUser = localStorage.getItem("user") || "";
        parseUser = JSON.parse(parseUser);
        console.log("parse user", parseUser)
        if (parseUser != "") {
            setUser(parseUser)
        } else {
            navigate("/login")
        }

    }, []);
    const buttonStyle = {
        backgroundColor: "white",
        border: "5px",
        borderRadius: "20px",
        padding: "20px",
        fontWeight: 600
    }

    return (
        <Box as={"main"} backgroundColor={"rgb(108, 117, 125)"}>
            <Box as={"nav"} display={"flex"} justifyContent={"center"} alignItems={"center"}
                backgroundColor={"#5dbab1"}
                padding={"12px 0px"}
                boxShadow={"0 2px 2px rgb(52 172 145 / 80%)"}
                gap={"20px"}
            >
                <Box display={"flex"} gap={"40px"}>


                    <Link {...buttonStyle} href="/">Home</Link>
                    <Link {...buttonStyle} href="/#/gallery">Cat Breeds</Link>
                    <Link {...buttonStyle} href="/#/advice">Submit Advices</Link>
                    <Link {...buttonStyle} href="/#/favorites">Helpful Advices</Link>
                    <Link {...buttonStyle} href="/#/contacts">Contacts</Link>
                    <Link {...buttonStyle} href="/#/about">AboutUS</Link>



                    <Button className="g-button" onClick={() => {


                        localStorage.removeItem("user");

                        navigate('/login')
                    }}>Logout</Button>


                </Box>

            </Box>
            <Outlet context={[user, setUser]} />

            <Box display={'flex'} flexDir={'row'} gap={10}>
                <span>BuildTime..: {import.meta.env.VITE_BUILD_TIME ?? 'DEV_HOT_RELOAD'}</span>
                <span>BuildID: {import.meta.env.VITE_BUILD_ID ?? 'DEV_HOT_RELOAD'}</span>
            </Box>
        </Box>
    );
}
