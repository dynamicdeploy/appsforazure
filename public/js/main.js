var AppRouter = Backbone.Router.extend({

    routes: {
        ""                  : "home",
        "pkgs"	: "list",
        "pkgs/page/:page"	: "list",
        "pkgs/add"         : "addPkg",
        "pkgs/:id"         : "pkgDetails",
        "about"             : "about"
    },

    initialize: function () {
        this.headerView = new HeaderView();
        $('.header').html(this.headerView.el);
    },

    home: function (id) {
        if (!this.homeView) {
            this.homeView = new HomeView();
        }
        $('#content').html(this.homeView.el);
        this.headerView.selectMenuItem('home-menu');
    },

	list: function(page) {
        var p = page ? parseInt(page, 10) : 1;
        var pkgList = new PkgCollection();
        pkgList.fetch({success: function(){
            $("#content").html(new PkgListView({model:pkgList, page: p}).el);
        }});
        this.headerView.selectMenuItem('home-menu');
    },

    pkgDetails: function (id) {
        var pkg = new Pkg({_id: id});
        pkg.fetch({success: function(){
            $("#content").html(new PkgView({model: pkg}).el);
        }});
        this.headerView.selectMenuItem();
    },

	addPkg: function() {
        var pkg = new Pkg();
        $('#content').html(new PkgView({model: pkg}).el);
        this.headerView.selectMenuItem('add-menu');
	},

    about: function () {
        if (!this.aboutView) {
            this.aboutView = new AboutView();
        }
        $('#content').html(this.aboutView.el);
        this.headerView.selectMenuItem('about-menu');
    }

});

utils.loadTemplate(['HomeView', 'HeaderView', 'PkgView', 'PkgListItemView', 'AboutView'], function() {
    app = new AppRouter();
    Backbone.history.start();
});