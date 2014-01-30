describe("Views", function() {
  beforeEach(function(){
    this.header = new viewHeader();
    this.home = new viewHome();
    this.details = new viewDetails();
  })
  describe("Header view", function() {
    it("Header.render() should return the Header view object", function() {  
      this.header.render().should.equal(this.header);
    });
  });
  describe("Home view", function() {
    it("Home.render() should return the Home view object", function() {
      this.home.render().should.equal(this.home);
    });  
  });
  describe("Details view", function() {
    it("Details.render() should return the Details view object", function() {
      this.details.render().should.equal(this.details);
    });
  });
})
