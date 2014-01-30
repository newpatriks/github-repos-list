describe("Models", function() {
  describe("User Model", function() {
    beforeEach(function(){
      this.user = new m_UserDetails();
    })    
    it("should be a json response ", function() {            
      this.user.fetch();
      this.user.should.be.json;
    });
    it("should have a method getBlog()",function() {
      this.user.getBlog.should.be.a('function');
    });    
  });
});
