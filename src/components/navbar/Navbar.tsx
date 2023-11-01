import { Button, Flex, Text } from "@chakra-ui/react";
import React, { useState } from "react";

const Navbar: React.FunctionComponent = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [login, setLogin] = useState(true);

  async function logoutUser() {
    try {
      const response = await fetch("http://localhost:3000/auth/logout", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        console.log("logged out");
      }
    } catch (err) {
      setError("An error occurred: " + err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Flex
        alignItems={"center"}
        justifyContent={"space-between"}
        width={"full"}
        height={"50px"}
        padding={"10px"}
        paddingX={"50px"}
        bg={"blue.300"}
      >
        <Flex>
          <Text fontWeight={"bolder"} color={"gray.800"}>
            TIME SLOTS BOOKING
          </Text>
        </Flex>
        <Flex gap={"10px"} alignItems={"center"}>
          <Button
            size={"xs"}
            fontSize={"xs"}
            fontWeight={"bold"}
            borderRadius={"5px"}
            bg={"white"}
            onClick={() => (window.location.href = "/zoom")}
            cursor={"pointer"}
          >
            Go to Bookings
          </Button>
          {login ? (
            <Button
              size={"xs"}
              fontSize={"xs"}
              fontWeight={"bold"}
              bg={"white"}
              borderRadius={"5px"}
              onClick={() => logoutUser()}
              disabled={loading}
            >
              Logout
            </Button>
          ) : null}
        </Flex>
      </Flex>
    </>
  );
};

export default Navbar;
