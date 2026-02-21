const { addPerson, loginPerson } = require("../src/controllers/personController");
const personRepository = require("../src/repositories/person.repository");

//
jest.mock('../src/utils/jwt',()=>({
    generateToken: jest.fn(()=>'jwt_token')
}));

// Mocking the request object
const mockRequest=()=>{
    return {
        body: {
            name: "Test Name",
            gender: "Male",
            mobile: "Test Number",
            email: "test@gmail.com",
            username: "Test NamUser",
            password: "12345678"
        }
    }
};

// Mocking the response object
const mockResponse=()=>{
    return {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis()
    }
};

// Mocking user response
const mockUser={
    _id: "mock_id",
    name: "Test Name",
    gender: "Male",
    mobile: "Test Number",
    email: "test@gmail.com",
    username: "Test NamUser",
    password: "12345678"
};

const userLogin={
    name: "Test Name",
    email: "test@gmail.com"
};

afterEach(()=>{
    // Restoring the mocks created with .spyOn() back to their original value
    console.log('After Each called');
});


describe('Register User',()=>{

    it('should register user',async ()=>{
        jest.spyOn(personRepository,"createPerson").mockResolvedValueOnce(mockUser);

        const mockReq=mockRequest();
        const mockResp=mockResponse();

        await addPerson(mockReq,mockResp);

        expect(mockResp.status).toHaveBeenCalledWith(201)
        expect(personRepository.createPerson).toHaveBeenCalledWith({
            name: "Test Name",
            gender: "Male",
            mobile: "Test Number",
            email: "test@gmail.com",
            username: "Test NamUser",
            password: "12345678"
        });
    }); 


    it('should return validation error',async ()=>{
        const mockReq=mockRequest().body={body:{}};
        const mockResp=mockResponse();

        await addPerson(mockReq,mockResp);

        expect(mockResp.status).toHaveBeenCalledWith(400);
        expect(mockResp.json).toHaveBeenCalledWith({
            err: 'Enter required fields'
        });
    });

    it('should return duplicate email error',async ()=>{
        // Rejecting the promise with code: 11000
        jest.spyOn(personRepository,"createPerson").mockRejectedValueOnce({code: 11000});

        const mockReq=mockRequest();
        const mockResp=mockResponse();

        await addPerson(mockReq,mockResp);

        expect(mockResp.status).toHaveBeenCalledWith(400);
        expect(mockResp.json).toHaveBeenCalledWith({
            err: 'Duplicate Email' 
        });
    });

});


describe('Login User',()=>{

    it('should return missing name error',async ()=>{
        const mockReq=mockRequest().body={body:{}};
        const mockResp=mockResponse();

        await loginPerson(mockReq,mockResp);

        expect(mockResp.status).toHaveBeenCalledWith(400);
        expect(mockResp.json).toHaveBeenCalledWith({
            error: 'Please enter name'
        });
    });

    it('should return invalid name error',async ()=>{
        jest.spyOn(personRepository,"getPerson").mockResolvedValueOnce(null);
        const mockReq=mockRequest().body={body:{...userLogin}};
        const mockResp=mockResponse();
        console.log(mockReq);

        await loginPerson(mockReq,mockResp);

        expect(mockResp.status).toHaveBeenCalledWith(401);
        expect(mockResp.json).toHaveBeenCalledWith({
            error: 'User not found'
        });
    });

    it('should login user',async ()=>{
        jest.spyOn(personRepository,"getPerson").mockResolvedValueOnce(mockUser);
        const mockReq=mockRequest();
        const mockResp=mockResponse();
        
        await loginPerson(mockReq,mockResp);

        expect(mockResp.status).toHaveBeenCalledWith(202);
        expect(mockResp.json).toHaveBeenCalledWith({
            Token: 'jwt_token'
        });
    });

});