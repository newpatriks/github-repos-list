describe("Models", function() {
	describe("User Model", function() {
		beforeEach(function(){
			this.user = new m_UserDetails();
			this.user.fetch();
		})
		it("should set url property ", function() {
			this.url = 'https://api.github.com/users/mbostock';
			this.user.set('url', this.url);
			this.user.url.should.equal(this.url);
		});
		it("should be a json response ", function() {
			this.url = 'https://api.github.com/users/mbostock';
			this.user.should.be.json;
		});
		it("should get the blog item from requested info at Github API",function() {
			this.user.getBlog().should.equal('http://bost.ocks.org');
		});
	});
});