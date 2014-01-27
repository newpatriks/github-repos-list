describe("Home View", function() {
  beforeEach(function(){
    this.header = new viewHeader();
    this.home = new viewHome();
    this.details = new viewDetails();
  })
  it("Header.render() should return the Header view object", function() {
    this.header.render().should.equal(this.header);
  });
  it("Home.render() should return the Home view object", function() {
    this.home.render().should.equal(this.home);
  });
  it("Details.render() should return the Details view object", function() {
    this.details.render().should.equal(this.details);
  });
})