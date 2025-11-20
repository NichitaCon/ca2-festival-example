import { useEffect, useState } from "react";
import axios from "@/config/api";
import { Link, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Eye } from "lucide-react";
import { Pencil } from "lucide-react";
import DeleteBtn from "@/components/DeleteBtn";
import { toast } from "sonner";

// import {
//   Card,
//   CardAction,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";

export default function Index() {
    const [festivals, setFestivals] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFestivals = async () => {
            const options = {
                method: "GET",
                url: "/festivals",
            };
            try {
                let response = await axios.request(options);
                console.log(response.data);
                setFestivals(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchFestivals();
    }, []);

    const onDeleteCallBack = (id) => {
        console.log("On Delete Callback called");
        toast.success("Festival deletes successfully");
        setFestivals(festivals.filter((festival) => festival.id !== id));
    };

    // const festivalCards = festivals.map((festival) => {
    //   return (
    //     <Card key={festival.id}>
    //       <CardHeader>
    //         <CardTitle>{festival.title}</CardTitle>
    //         <CardDescription>{festival.description}</CardDescription>
    //         {/* <CardAction></CardAction> */}
    //       </CardHeader>
    //       {/* <CardContent>
    //         <p>Card Content</p>
    //       </CardContent> */}
    //       <CardFooter>
    //         <Button
    //         asChild
    //         variant="outline"

    //         ><Link size="md" to={`/festivals/${festival.id}`}>View</Link></Button>
    //       </CardFooter>
    //     </Card>
    //   );
    // });

    return (
        <div>
            <Button asChild variant="outline" className={"mb-4 mr-auto block"}>
                <Link size="sm" to={`/festivals/create`}>
                    Create New Festival
                </Link>
            </Button>
            <Table>
                <TableCaption>A list of festivals</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>City</TableHead>
                        <TableHead>Start Date</TableHead>
                        <TableHead>End Date</TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {festivals.map((festival) => (
                        <TableRow key={festival.id}>
                            <TableCell>{festival.title}</TableCell>
                            <TableCell>{festival.city}</TableCell>
                            <TableCell>{festival.start_date}</TableCell>
                            <TableCell>{festival.end_date}</TableCell>
                            <TableCell>
                                <div className="flex gap-2">
                                    <Button
                                        className="cursor-pointer hover:border-blue-500"
                                        variant="outline"
                                        size="icon"
                                        onClick={() =>
                                            navigate(
                                                `/festivals/${festival.id}`
                                            )
                                        }
                                    >
                                        <Eye />
                                    </Button>
                                    <Button
                                        className="cursor-pointer hover:border-blue-500"
                                        variant="outline"
                                        size="icon"
                                        onClick={() =>
                                            navigate(
                                                `/festivals/${festival.id}/edit`
                                            )
                                        }
                                    >
                                        <Pencil />
                                    </Button>
                                    <DeleteBtn
                                        onDeleteCallBack={onDeleteCallBack}
                                        resource="festivals"
                                        id={festival.id}
                                    />
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
