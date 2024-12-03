import express from "express";
import methodOverride from "method-override";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

let posts = [];

app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: true}))

app.use(methodOverride('_method'));

app.get('/', (req, res) => {
    res.render('index.ejs', { posts: posts })
})

app.get('/newPost', (req, res) => { 
    res.render('newPost.ejs')
})

app.post('/submit', (req, res) => {

    const newPost = {
        id: posts.length + 1,
        fName: req.body.fname,
        lName: req.body.lname,
        title: req.body.title,
        subheading: req.body.subheading,
        textbody: req.body.textbody,
        imgURL: req.body.imgurl,
    };

    posts.push(newPost);

    res.redirect('/');
    })

    //     const fName = req.body.fname;
//     const lName = req.body.lname;
//     const title = req.body.title;
//     const subheading = req.body.subheading;
//     const textbody = req.body.textbody;
//     const imgURL = req.body.imgurl;

//     res.render('index.ejs', { 
//         fName: fName,
//         lName: lName,
//         title: title,
//         subheading: subheading,
//         textbody: textbody,
//         imgURL: imgURL,
//     })

// })
;

// app.get('/edit/:id', (req, res) => { 
//     const postId = parseInt(req.params.id); 
//     const post = posts.find(p => p.id === postId);
//     res.render('editPost', { post: post }); });

// app.patch('/edit/:id', (req, res) => { 
//     const postId = parseInt(req.params.id); 
//     const postIndex = posts.findIndex(p => p.id === postId); 
//     if (postIndex !== -1) { 
//         const updatedPost = { 
//             ...posts[postIndex], 
//             fName: req.body.fname || posts[postIndex].fName, 
//             lName: req.body.lname || posts[postIndex].lName, 
//             title: req.body.title || posts[postIndex].title, 
//             subheading: req.body.subheading || posts[postIndex].subheading, 
//             textbody: req.body.textbody || posts[postIndex].textbody, 
//             imgURL: req.body.imgurl || posts[postIndex].imgURL, 
//         }; 
//         osts[postIndex] = updatedPost; 
//         res.json({ message: "Post updated", post: updatedPost });
//      } else { 
//         res.status(404).json({ message: "Post not found" }); 
//     }
// });

app.get('/edit/:id', (req, res) => { 
    const postId = parseInt(req.params.id); 
    const post = posts.find(p => p.id === postId); 
    if (post) { 
        res.render('editPost.ejs', 
            { post: post }); 
        } else { 
            res.status(404).send('Post not found'); 
        } 
        }); 

app.patch('/edit/:id', (req, res) => { 
    const postId = parseInt(req.params.id); 
    const post = posts.find(p => p.id === postId); 
    if (post) { 
        post.fName = req.body.fname; 
        post.lName = req.body.lname; 
        post.title = req.body.title;
        post.subheading = req.body.subheading; 
        post.textbody = req.body.textbody; 
        post.imgURL = req.body.imgurl; 
        res.redirect('/'); 
    } else { 
        res.status(404).json({ message: 'Post not found' }); 
    }
});


// app.get('/delete/:id', (req, res) => { 
//     const postId = parseInt(req.params.id);
//     const postIndex = posts.findIndex(p => p.id === postId);
//     if (postIndex !== -1) { 
//         res.redirect('/')
//     } else { 
//         res.status(404).send('Post not found'); 
//     } 
// })

app.delete('/delete/:id', (req, res) => { 
    const postId = parseInt(req.params.id);
    const postIndex = posts.findIndex(p => p.id === postId);
    if (postIndex !== -1) { 
        posts.splice(postIndex, 1),
        res.redirect('/')
} else { 
    res.status(404).send('Post not found'); 
}
})


app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
