function content() {
    this.data = '';

    this.getData = function(type) {
        if(type=='articles_preview'){
            this.data = content_main;
        }
        if(type=='articles_full'){
            this.data = content_main_detailed;
        }
        if(type=='article_about'){
            this.data = content_about;
        }
        if(type=='article_contacts') {
            this.data = content_contacts;
        }
        if(type=='gallery'){
            this.data = content_gallery;
        }
    }

    this.createContent = function(data_type, id) {
        this.getData(data_type);
        if(this.data=='') {return;}
        let container = $('#content-right').html('');
        if(id!=undefined) {
            let content_data = this.data.content.find(obj=>{ return obj.id == id });
            if(data_type=='articles_preview') {$(createArticlesPreview(content_data)).appendTo(container);}
            if(data_type=='articles_full'){$(createArticle(content_data)).appendTo(container);}
            if(data_type=='article_full'){$(createArticle(content_data)).appendTo(container);}
            if(data_type=='gallery'){$(createAlbum(content_data)).appendTo(container);}
        } else {
            let content_data = this.data.content;
            if(data_type=='articles_preview') {$(createArticlesPreview(content_data)).appendTo(container);}
            if(data_type=='articles_full'){$(createArticle(content_data)).appendTo(container);}
            if(data_type=='article_full'){$(createArticle(content_data[0])).appendTo(container);}
            if(data_type=='gallery'){$(createAlbums(content_data)).appendTo(container);} 
        }
        $(container).append(createFooter());
    }
    
}

function createArticlesPreview(content) {
    let main_div = $('<div>');
    $('<h4>', {text: 'Новости'}).appendTo(main_div);
    content.forEach(element => {
        let m = moment(element.date);
        m.locale('ru');
        $('<div>').html(element.data)
        .append($('<nav>').addClass('article_preview-postdata')
        .append($('<p>', { text: `Автор: Админ, ${m.format('LL')}`,}))
        .append($('<a>', {href: `?data-id=articles_full&element-id=${element.id}`, text: 'Читать все...'})))
        .addClass('article_preview').appendTo(main_div);}); 
    return main_div;
}

function createArticle(content) {
    let m = moment(content.date);
    m.locale('ru'); 
    let main_div = $('<div>');
        $('<div>', {
            html: content.data, 
            append: $('<nav>', { 
                append: $('<p>', { text: `Автор: Админ, ${m.format('LL')}`}) 
            }).addClass('article_preview-postdata')

        }).addClass('article_preview').appendTo(main_div); 
    return main_div;
}

function createAlbums(content) {
    let main_div = $('<div>').addClass('gallery, w-100').append($('<h4>', {text: 'Галерея'}));
    content.forEach(item=> {
        let div = $('<div>').addClass('album_preview').appendTo(main_div)
        .append($('<h5>').text(item.title)).append($('<h6>').text(item.date_place))
        .append($('<nav>')
                .append($('<a>', {href: `?data-id=gallery&element-id=${item.id}`}).addClass('w-75').append($('<img>', {src: `./img/albums/${item.id}/${item.images[0]}`}).addClass('w-100'))));
        
    });
    return main_div;
}
function createAlbum(content) {
    let main_div = $('<div>').addClass('gallery, w-100')
    .append($('<h4>', {text: `${content.title}`}))
    .append($('<h5>', {text: `${content.date_place}`}));
    let coll = $('<div>').addClass('album').appendTo(main_div);
    content.images.forEach(item=> {
        let div = $('<nav>').addClass('col-5 p-0').appendTo(coll)
                .append($('<img>', {src: `./img/albums/${content.id}/${item}`}).addClass('w-100'));
        
    });
    return main_div;
}
function createFooter(){
    return $(`<div class="w-100">
    <p class="footer">
        The 501st Legion and Rebel Legion are worldwide Star Wars costuming organizations comprised of and operated by Star Wars fans. While not sponsored by Lucasfilm Ltd., they are Lucasfilm's preferred costuming groups. Star Wars, its characters, costumes, and all associated items are the intellectual property of Lucasfilm. © & ™ Lucasfilm Ltd. All rights reserved. Used under authorization.
    </p>
    </div>`);
}