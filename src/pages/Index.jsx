import React, { useState } from "react";
import { Box, Heading, Container, VStack, HStack, Input, Button, Text, Image, useToast, Divider, Stack, IconButton } from "@chakra-ui/react";
import { FaUserPlus, FaDollarSign, FaVoteYea } from "react-icons/fa";

const Index = () => {
  const [participants, setParticipants] = useState([]);
  const [newParticipantName, setNewParticipantName] = useState("");
  const [votesPurchased, setVotesPurchased] = useState(0);
  const toast = useToast();

  const handleRegister = () => {
    if (newParticipantName.trim() === "") {
      toast({
        title: "Error",
        description: "Participant's name cannot be empty.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setParticipants([
      ...participants,
      {
        name: newParticipantName,
        votes: 0,
      },
    ]);

    setNewParticipantName("");
    toast({
      title: "Success",
      description: `${newParticipantName} has been registered successfully!`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleBuyVotes = (index) => {
    const updatedParticipants = [...participants];
    updatedParticipants[index].votes += votesPurchased;
    setParticipants(updatedParticipants);
    setVotesPurchased(0);
  };

  return (
    <Container maxW="container.md" py={10}>
      <VStack spacing={8}>
        <Heading>Voting Contest</Heading>
        <HStack as="form" onSubmit={(e) => e.preventDefault()} spacing={4}>
          <Input placeholder="Enter participant name" value={newParticipantName} onChange={(e) => setNewParticipantName(e.target.value)} />
          <IconButton icon={<FaUserPlus />} colorScheme="green" onClick={handleRegister} aria-label="Register participant" />
        </HStack>

        <Divider />

        {participants.map((participant, index) => (
          <HStack key={index} justifyContent="space-between" width="full">
            <Text fontWeight="bold">{participant.name}</Text>
            <Stack direction="row" alignItems="center">
              <Input placeholder="Votes to buy" type="number" value={votesPurchased} onChange={(e) => setVotesPurchased(parseInt(e.target.value, 10))} />
              <Button leftIcon={<FaDollarSign />} colorScheme="yellow" onClick={() => handleBuyVotes(index)}>
                Buy Votes
              </Button>
            </Stack>
            <Text>{participant.votes} Votes</Text>
          </HStack>
        ))}

        <Divider />

        <Button
          leftIcon={<FaVoteYea />}
          colorScheme="blue"
          size="lg"
          isFullWidth
          onClick={() =>
            toast({
              title: "Voting Completed",
              description: "The voting contest has ended. Check the results!",
              status: "info",
              duration: 5000,
              isClosable: true,
            })
          }
        >
          Complete Voting
        </Button>
      </VStack>
    </Container>
  );
};

export default Index;
