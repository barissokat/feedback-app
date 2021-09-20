import { useRef, useState } from "react";
import { useForm } from "react-hook-form";

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

const AddSiteModal = () => {
    const initialRef = useRef();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { register, formState: { errors }, handleSubmit } = useForm();
    // const [result, setResult] = useState("");
    // const createSite = (data) => setResult(JSON.stringify(data));
    const toast = useToast();
    const auth = useAuth();

    const onCreateSite = ({name, url}) => {
        createSite({
            authorId: auth.user.uid,
            createdAt: new Date().toISOString(),
            name,
            url
        });
        toast({
            title: "Success!",
            description: "We've added your site.",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        onClose();
    };
  
    return (
      <>
        <Button variant="solid" size="md" maxWidth="200px" onClick={onOpen}>
            Add Your First Site
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

                    {/* <FormControl>
                        {result}
                    </FormControl>  */}
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