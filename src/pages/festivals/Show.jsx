import { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "@/config/api";

import LoginForm from "@/components/ui/LoginForm";

export default function ShowFestival() {
    const [festival, setFestival] = useState({});
    const {id} = useParams()
    console.log("params in ShowFestivalSingle", id)

    let token = localStorage.getItem('token')

    useEffect(() => {
        const fetchFestivals = async () => {
            const options = {
                method: "GET",
                url: `/festivals/${id}`,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };

            try {
                let response = await axios.request(options);
                console.log("Single festival api response:", response.data);
                setFestival(response.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchFestivals();
        console.log("async test");
    }, []);

    return (
        <div>
            <h1>Show festival</h1>

        </div>
    );
}
