let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
const url= 'http://localhost:8000/api/sucursales';


describe('Test: ',()=>{
    it('should create a branch', (done) => {
        chai.request(url)
        .post('/create')
        .send({sucursal: {
            direccion: 'sucursal10',
            latitud:  12312,
            longitud: 100 
        }})
        .end( function(err,res){
        expect(res).to.have.status(200);
        done();
        });
    });
    it('should return status 400', (done) => {
        chai.request(url)
        .post('/create')
        .send({sucursal: {
            latitud:  12312,
            longitud: 100 
        }})
        .end( function(err,res){
        expect(res).to.have.status(400);
        done();
        });
    });
    it('should return the closest brunch', (done) => {
        chai.request(url)
        .get('/getCloser?latitud=5&longitud=5')
        .send()
        .end( function(err,res){
            // console.log(res)
        expect(res.text).to.be.equal('sucursal6');
        done();
        });
    });
   });