import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { mutate } from 'swr';

import {
    Button,
    FormControl,
    FormLabel,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    useToast
} from "@chakra-ui/react";

import { createSite } from "@/lib/db";
import { useAuth } from "@/lib/auth";

const AddSiteModal = ({ children }) => {
    const initialRef = useRef();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { register, formState: { errors }, handleSubmit } = useForm();
    const auth = useAuth();
    const toast = useToast();

    const onCreateSite = ({name, url}) => {
        const newSite = {
            authorId: auth.user.uid,
            createdAt: new Date().toISOString(),
            name,
            url
        };

        const { id } = createSite(newSite);

        toast({
            title: "Success!",
            description: "We've added your site.",
            status: "success",
            duration: 3000,
            isClosable: true,
        });

        mutate(
            ['/api/sites', auth.user.token],
            async (data) => ({
                sites: [{ id, ...newSite }, ...data.sites]
              }),
            false
        );

        onClose();
    };
  
    return (
      <>
        <Button
            onClick={onOpen}
            backgroundColor="gray.900"
            color="white"
            fontWeight="medium"
            _hover={{ bg: 'gray.700' }}
            _active={{
                bg: 'gray.800',
                transform: 'scale(0.95)'
            }}
        >
            {children}
        </Button>
  
        <Modal
          initialFocusRef={initialRef}
          isOpen={isOpen}
          onClose={onClose}
        >
            <ModalOverlay />
            <ModalContent as="form" onSubmit={handleSubmit(onCreateSite)}>
                <ModalHeader fontWeight="bold">Add Site</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <FormControl mb={4}>
                        <FormLabel>Name</FormLabel>
                        <input ref={initialRef} {...register("name", { required: true, minLength: 3 })} placeholder="My site" />
                        {errors.name?.type === 'required' && "Site name is required"}
                    </FormControl>
    
                    <FormControl mb={4}>
                        <FormLabel>Link</FormLabel>
                        <input {...register("url", { required: true, minLength: 3 })} placeholder="https://website.com" mr={1} />
                        {errors.url?.type === 'required' && "Link is required"}
                    </FormControl>
                </ModalBody>
    
                <ModalFooter>
                    <Button onClick={onClose} mr={3} fontWeight="medium">Cancel</Button>
                    <Button type="submit" colorScheme="teal" fontWeight="medium">Create</Button>  
                </ModalFooter>
            </ModalContent>
        </Modal>
      </>
    )
}

export default AddSiteModal