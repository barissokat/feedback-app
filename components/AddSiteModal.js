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
    useDisclosure
} from "@chakra-ui/react";

import { createSite } from "@/lib/db";

const AddSiteModal = () => {
    const initialRef = useRef();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { register, formState: { errors }, handleSubmit } = useForm();
    // const [result, setResult] = useState("");
    // const createSite = (data) => setResult(JSON.stringify(data));
    const onCreateSite = (data) => createSite(data);
  
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
                        <input {...register("link", { required: true, minLength: 3 })} placeholder="https://website.com" mr={1} />
                        {errors.link?.type === 'required' && "Link is required"}
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