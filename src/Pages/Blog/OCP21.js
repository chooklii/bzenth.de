import React, { useContext, useState } from "react";
import { Footer, Header } from "../../Components";
import { Helmet } from "react-helmet";
import { Collapse, Divider } from "antd";
import { TranslationContext } from "../../helper";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import SyntaxHighlighter from "react-syntax-highlighter";

const { Panel } = Collapse;

const question1 = `
public class Question1 {
  public static void main(String... args) {
    String pre = "Ben";
    String post = "jamin";

    String s1 = "Benjamin";
    String s2 = pre + post;
    String s3 = "Ben" + "jamin";
    String s4 = getName();

    System.out.println(s1.equals(s2));
    System.out.println(s1 == s2);
    System.out.println(s1 == s3);
    System.out.println(s1 == s4);
    System.out.println(s3.equals(s4));
  }
  static String getName() {
    return "Benjamin";
  }
}
`;

const question2 = `
public class Question2{
public static void main(String... args) {
	getName(null)
}

static void getName(Number number) {
    System.out.println("Number");
}

static void getName(Object object) {
    System.out.println("Object");
}

static void getName(Integer integer ) {
    System.out.println("Integer");
}
}
`;

const question3 = `
abstract class A {
  int i = 10;

  void getName() {
    System.out.println("Interface A");
  }
}
abstract class B extends A {
  int i = 20;

  void getName() {
    System.out.println("Interface B");
  }
}

public class Question3 extends B {
  int i = 30;

  void getId() {
    System.out.println(i);  
  }

  void getName() {
    System.out.println("Question3");
  }

  public static void main(String... args) {
    A object = new Question3();

    System.out.println(object.i);
    object.getName();
  }
}
`;

const question4 = `
class A {};
class B extends A {};
class C extends B {};

public class Question4 {

  public static void main(String...args) {
    List < ? super B > listA = new ArrayList();
    List < ? extends B > listB = new ArrayList();

    //B b = listA.get(0);
    //C c = listA.get(0);
    //listA.add(new B());
    //listA.add(new C());

    //B b = listB.get(0); 
    //C c = listB.get(0);
    //listB.add(new B());
    //listB.add(new C());
  }
}

`;

const question5 = `
public class Question5{
    
    public static void main(String... args){
        AtomicInteger count = new AtomicInteger(0);

        var list = List.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
        
        Predicate<Integer> predicate = i -> i > 5;
        list.stream()
            .parallel()
            .map(x -> x + 10)
            .filter(x -> x %2 == 0)
            .map(x -> x * 5)
            .filter(predicate)
            .peek(i -> count.getAndAdd(i));
            
        System.out.println(count);
    }
}

`;

const OCP21 = () => {
  const { getText } = useContext(TranslationContext);

  return (
    <div>
      <Helmet>
        <title>Java SE 21 Developer Professional</title>
        <meta
          name="description"
          content="I took and passed the 'Java SE 21 Developer Professional' exam. I share my experience and my learning"
        />
        <meta name="keywords" content="OCP, 21, Java, Java SE 21 Developer Professional, 1Z0-830" />
        <meta property="og:title" content="Java SE 21 Developer Professional" />
        <meta
          property="og:description"
          content="I took and passed the 'Java SE 21 Developer Professional' exam. I share my experience and my learning"
        />
        <meta property="canonical" content="https://bzenth.de/blog/ocp21/" />
      </Helmet>
      <Header />
      <div className="page_classic blog_page">
        <div className="blog_date">written in May 2026</div>
        <div className="blog_translation">{getText("blog.onlyEnglish")}</div>
        <h2 className="blog_heading">My Journey to OCP21: A Personal Experience Report</h2>
        Back in 2025, my back then teamlead and now coworker/mentor asked me if we should take this really difficult
        Java exam called "Oracle Certified Professional: Java SE 21 Developer" (OCP21). <br />
        I didn't know much about the OCP21 back then, but I successfully passed the exam this week. During my
        preparation, I was constantly looking for other people describing their experience taking the exam, but there
        are only a few. Therefore, I decided to share my own experience learning and taking the exam for all the people
        out there interested in taking on the OCP themselves. To make it a better read, I will add some questions I
        created myself to this post regarding topics most of the people working with Java are using on their daily
        basis. (They might be hard to read on smartphones thus I recommend solving them on your computer) <br />
        <br />
        <i>
          <b>Note:</b> I am not allowed - nor willing - to share questions I encountered during my exam. The following
          questions are entirely self-created practice examples inspired by public Java topics covered in the
          certification syllabus and are not based on actual exam questions. Examples within the text are based on
          things that came to my mind in that moment and not on actual exam questions.
        </i>
        <Divider />
        <ol className="blog_content" role="list">
          <li>
            <a href="#what">
              <span className="title">What is the OCP21?</span>
            </a>
          </li>
          <li>
            <a href="#learning">
              <span className="title">Learning for the Exam</span>
            </a>
          </li>
          <li>
            <a href="#exam">
              <span className="title">Taking the exam</span>
            </a>
            <ul>
              <li>
                <a href="#format">
                  <span className="title">Format</span>
                </a>
              </li>
              <li>
                <a href="#buying">
                  <span className="title">Buying</span>
                </a>
              </li>
              <li>
                <a href="#schedule">
                  <span className="title">Schedule</span>
                </a>
              </li>
              <li>
                <a href="#examitself">
                  <span className="title">The Exam itself</span>
                </a>
              </li>
              <li>
                <a href="#post">
                  <span className="title">Post Exam</span>
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#final">
              <span className="title">Final Thoughts</span>
            </a>
          </li>
        </ol>
        <h2 className="blog_heading" id="what">
          What is the OCP21?
        </h2>
        For the people that don't know the OCP Exam, I asked an AI to describe the exam in a few sentences:
        <pre className="blog_code_pre">
          <i>
            "The OCP 21 Java Exam is essentially the 'Black Belt' of the programming world. Officially known as the
            Oracle Certified Professional: Java SE 21 Developer certification, it serves as the global gold standard for
            proving that a developer has reached a professional, elite level of mastery in the Java language."
          </i>
        </pre>
        The scope of the exam can be found{" "}
        <a
          target="_blank"
          href="https://mylearn.oracle.com/ou/exam/java-se-21-developer-professional-1z0-830/40805/139080/220555"
        >
          here
        </a>
        . If I had to describe the scope within one sentence I would say that 'if it is within the language it is within
        the scope of the exam'.
        <Divider />
        <b>Question 1: What is the output of this code?</b>
        <SyntaxHighlighter showLineNumbers wrapLongLines="true" className="blog-code" language="java">
          {question1}
        </SyntaxHighlighter>
        <Collapse defaultActiveKey={["1"]} ghost>
          <Panel header="See Results and Explaination" key="0">
            <div className="blog_code">
              true false true true true
              <br />
              <br />
              There are some things to know here. <br />
              First: The difference between <code>.equals()</code> and <code>==</code> is that <code>.equals()</code>{" "}
              checks for the equality of both objects, while <code>==</code> only compares the objects' references.
              Thus, line 12 is true, while line 13 is false, as both strings reference different objects. <br />
              Second: Line 14 is where some "magic" happens. Java uses a String Pool for compile-time constant strings.
              As a string is immutable, all compile-time constant strings refer to the same object in memory. The
              compiler detects the concatenation of "Ben" and "jamin" at compile time and thus uses the existing string
              from the pool. Given this, <code>s1 == s3</code> is true.
            </div>
          </Panel>
        </Collapse>
        <Divider />
        <h2 className="blog_heading" id="learning">
          Learning for the Exam
        </h2>
        My initial learning process, and what I can recommend to all, is the 'OCP Study Guide' by{" "}
        <a href="https://www.selikoff.net/ocp21/" target="_blank">
          Jeanne Boyarsky and Scott Selikoff
        </a>
        . <br />
        Both have created similar books for the OCP 11 and OCP 17 (Java versions). This almost 1,000-page book is split
        into 14 chapters, starting with basic building blocks and ending with I/O. It ends each chapter with questions
        regarding that topic. I read the book and each chapter multiple times, and I think it is important to really
        understand each individual topic. <br />I used it as a guide and did deep dives into each topic I wasn't
        comfortable with. My favorites have been the JEPs regarding each topic as they, in my opinion, provide a great
        reasoning for the implementation of some features, which then helps (at least me) to use these (e.g.,
        <a href="https://openjdk.org/jeps/444" target="_blank">
          on Virtual Threads
        </a>
        ). <br /> My recommendation is to also actively use these features. I created a repo for my learning process and
        continuously developed dummy features within this. At least for me, it is easier to understand how to compile
        Java code on the command line when having put some code on the module path multiple times (vs. just reading
        about it). I dont know how many more times I will compile and run my java programms using the terminal vs.
        'just' starting them within my IDE but it is within the scope of the exam so it is time to learn it and I think
        it helps my understanding of the language I am working with on a daily basis.
        <br /> As I am only 28 years old, I am in fact almost 2 years younger than Java itself. Thus, I only used the
        language for a small period of time. Reading the study guide helped me understand older features, backward
        compatibility, and such. Thus, I can also recommend this book to people who just want to improve their Java
        knowledge. Knowing why <code>ThreadLocal</code> was implemented is useful for understanding why{" "}
        <code>Scoped Values</code> are added in Java 25.
        <br /> The numbers guy that I am, I wrote down all my results for the chapters, assessment tests, and test
        exams.
        <Collapse defaultActiveKey={["0"]} ghost>
          <Panel header="See my results here" key="1">
            <div>
              Note: I did some of these questions multiple times (with months inbetween). I include only the result of
              my last run. <br />
              <br />
              Chapter 1: 22/23 <br />
              Chapter 2: 15/20 <br />
              Chapter 3: 25/30 <br />
              Chapter 4: 17/22 <br />
              Chapter 5: 16/21 <br />
              Chapter 6: 22/26 <br />
              Chapter 7: 18/30 <br />
              Chapter 8: 17/21 <br />
              Chapter 9: 14/23 <br />
              Chapter 10: 21/21 <br />
              Chapter 11: 21/26 <br />
              Chapter 12: 16/25 <br />
              Chapter 13: 19/25 <br />
              Chapter 14: 18/25 <br />
              <br />
              Testexam 1: 30/50 <br />
              Testexam 2: 28/50 <br />
              Testexam 3: 43/50 <br />
              <br />
            </div>
          </Panel>
        </Collapse>
        Even though this may all be fun and exciting, there are some parts you — in my opinion — just need to learn as
        they may be used within the exam. The study guide does a good job here, mentioning whenever you need to simply
        know something.
        <figure className="blog_figure_left">
          <img className="blog_flashcards blog_img" aria-label="All my flashcards and a tenisball" />
          <figcaption className="blog_img_text">317 flashcards or one serve and volley at Wimbledon. ;)</figcaption>
        </figure>
        <br /> It's up to you to decide if you need to know that a Queue has two functions to read a value, of which{" "}
        <code>.element()</code> throws a runtime exception if the queue is empty while <code>.peek()</code> returns
        null. I find it useful to know such things myself. I've had good experiences being able to provide actual
        feedback on pull requests (e.g., regarding IO) without the need to check the documentation. To provide you with
        a number (at the end): I had (yes, I counted them for this) 317 flashcards on my desk, which is definitely on
        the higher count of what I think is needed, but I wanted to be safe, not sorry. The example with the Queue was
        one flashcard (with the addition of the other Queue functions <code>add(T), element(), offer(T), poll()</code>).
        <br/><br/>
        I also had a note pad on my desk where I wrote down all special cases I stumbled across during my learning. To 
        provide an example: <br/>Did you know, that dividing an Integer or Long with 0 results in an ArithmeticException 
        (RuntimeException)? But what happens when you do this with an float or double? You guessed correctly, the result 
        is positive infinity. (With an extra function <code>.isInfinite()</code> for the reference type Double and Float) <br/>

        <br />
        <br /> At this point, I felt well prepared to take on the exam for the first time. I failed my first attempt in
        a nail-biter with 33 out of 34 correct answers (required to pass). <br /> Which meant: back to the drawing
        board. In hindsight, I think I am actually happy I did not pass the exam within my first attempt, as I did learn
        much more afterwards. To improve my knowledge after this attempt, I used the mock exams from Enthuware. I took
        all but two tests (total of 18 mock exams with 4 foundation tests) and scored an average score of 74% in them.
        Similar to the study guide, I used these tests as a baseline and read about all kinds of topics. I spend over an
        month of learning between my first and second attempt.
        <Divider />
        <b>Question 2: What is the output of this code?</b>
        <SyntaxHighlighter showLineNumbers wrapLongLines="true" className="blog-code" language="java">
          {question2}
        </SyntaxHighlighter>
        <Collapse defaultActiveKey={["1"]} ghost>
          <Panel header="See Results and Explaination" key="0">
            <div className="blog_code">
              Integer
              <br />
              <br />
              The Output is Integer, as an Integer is the most specific within the three options, as it is a sub-type of
              Number which is a sub-type of Object. <br />
              If we add a function with the input type String it would not compile, as the compiler cannot tell if the
              function for the type String or Integer should be selected.
            </div>
          </Panel>
        </Collapse>
        <Divider />
        <h2 className="blog_heading" id="exam">
          Taking the exam
        </h2>
        <h3 className="blog_heading" id="format">
          Format
        </h3>
        The exam can be taken online. It consists of 50 multiple choice questions, of which you need to correctly answer
        34 in a given time of two hours. One question contains up to 10 options (I did not count them, that's what the
        study guide says :D), of which you need to choose a given number of options. The exam will tell you how many
        answers are correct. Some of these answers are really long (the study guide says up to 30 lines of code each).
        Within both of my takes, I only had a few minutes left after the last question (which is odd, as I never had
        issues with time in all the exams I have taken in my life). 2.5 minutes for each question sound a lot, but this
        time is short when there are multiple options and you need to evaulate them all one by one.
        <h3 className="blog_heading" id="buying">
          Buying
        </h3>
        To take the exam, you need to buy an 'attempt'. Selikoff provides a great{" "}
        <a
          href="https://www.selikoff.net/2024/07/18/paying-for-the-java-certification-online-2024-edition/"
          target="_blank"
        >
          guide
        </a>{" "}
        for this. An important note is that if your employer pays for this exam, the 'exam attempts' will be granted to
        the account linked to the invoice address. If no account for this email address exists, you need to create one.
        At least in my opinion, that's an important note, as it may not be a good idea to add, e.g., a general
        company-wide email address or accounting as an invoice recipient. The invoice email address account is then able
        to send these exam attempts to other accounts. I guess this makes sense for companies where employees regularly
        take exams at Oracle and thus the company just buys 30 exam attempts and uses these whenever needed.
        <Divider />
        <b>Question 3: What is the output of this code?</b>
        <SyntaxHighlighter showLineNumbers wrapLongLines="true" className="blog-code" language="java">
          {question3}
        </SyntaxHighlighter>
        <Collapse defaultActiveKey={["1"]} ghost>
          <Panel header="See Results and Explaination" key="0">
            <div className="blog_code">
              10 Question3
              <br />
              <br />
              The function <code>getName()</code> is correctly overridden; thus, even though the reference in line 25 is
              of type A the object it references is still of the type Question3. Thus polymorphism is applied and the
              function from Question3 is called. Note that due to the fact that the reference is of the type A this type
              'decides' what functions are available. Calling <code>object.getId()</code> would not compile as this
              function is not available for A. Casting it to the type Question3 would allow us to call the function{" "}
              <code>((Question3) object).getId()</code>. This does not apply to fields, as they can only be hidden,
              which results in line 27 using the int from class A.
            </div>
          </Panel>
        </Collapse>
        <Divider />
        <h3 className="blog_heading" id="schedule">
          Schedule
        </h3>
        I can once again only recommend the{" "}
        <a
          href="https://www.selikoff.net/2024/07/18/scheduling-the-a-java-certification-online-2024-edition/"
          target="_blank"
        >
          guide
        </a>{" "}
        from Selikoff. I recommend completing the system check and test exam beforehand to be comfortable when it comes
        to your actual exam attempt. The exam attempts can be rescheduled up until 24h prior to the exam and also taken
        quite spontaneously. When checking the website, I was always able to schedule my attempt ~1h in the future.
        That’s what I did with my second attempt, as I decided on Tuesday evening to take the exam, scheduled it on
        Wednesday morning, and wrote it 1h later. The exam comes with a check-in time which starts 30min prior to the
        scheduled time. AFAIK, you need to check in within these 30min. The check-in is quickly done with verification
        and such (especially when you have checked your system the day prior). You can start your exam attempt as soon
        as this check-in is complete. Thus, I started my exam attempt initially scheduled for 09:00 (check-in starts at
        08:30) at 08:35 and finished at 10:35.
        <h3 className="blog_heading" id="examitself">
          Exam itself
        </h3>
        The exam itself is quite unspectacular: 50 questions, 2h, and go-time. Within my first attempt, I had no issues.
        My second attempt was quite exciting. After ~45 questions, I got an error message saying my internet connection
        was not stable. I was thrown out of the exam and was not able to get back in. This was quite a shocker, as I had
        a great feeling about my run and was almost 90% sure that I would pass this time. I immediately opened a ticket
        at Oracle. My result was pending as my time was still running. After my exam timed out (and was submitted, which
        will happen automatically if the time runs out), I got my result and passed with 35 correct answers (out of 34
        required; keep in mind I only answered ~45 questions). Happy result — including those 20 minutes between my
        internet issues and the result, which felt like forever.
        <Divider />
        <b>Question 4: Which three individual lines of code can be uncommented without causing compilation errors?</b>
        <SyntaxHighlighter showLineNumbers wrapLongLines="true" className="blog-code" language="java">
          {question4}
        </SyntaxHighlighter>
        <Collapse defaultActiveKey={["1"]} ghost>
          <Panel header="See Results and Explaination" key="0">
            <div className="blog_code">
              14, 15 and 17
              <br />
              <br />
              We leave the easy questions behind and start with some Generics fun. <br /> listA is a list of B or a
              supertype of B (such as A or Object). listB is a list of B or a child type of B (such as C). <br />
              Given this, lines 12 and 13 do not compile because listA could be a list of A or Object, and neither can
              be automatically cast down to a B or C. In contrast, lines 14 and 15 do compile because both are objects
              of type B (since C extends B, every C is also a B). As listA is guaranteed to handle at least type B,
              adding these is safe.
              <br />
              <br />
              Line 17 compiles because no matter what specific type listB is (B or C), it is always safe to treat an
              element from that list as a B. This is not true for line 18, as the list might be a{" "}
              <code>{"List<B>"}</code>, which could contain objects that are not of type C. Lines 19 and 20 do not
              compile because the list might be a <code>{"List<C>"}</code>, making it unsafe to add a B. It could even
              be a list of an even more specific subtype of C. While we can see there is no more specific implementation
              than C in this file, the compiler cannot assume this as class D could extend B.
            </div>
          </Panel>
        </Collapse>
        <Divider />
        <h3 className="blog_heading" id="post">
          Post Exam
        </h3>
        You will be sent an email with your result. You can access the result manually using the Oracle CertView
        website. They will also send you a detailed description of how to get your certification. Thus, I can say that
        after all the work,{" "}
        <a
          href="https://catalog-education.oracle.com/pls/certview/sharebadge?id=5167E634385288732DA3655451B71F33DEA9FF72D0588E4ECA6A1E0B5599FDA5"
          target="_blank"
        >
          here it is!
        </a>
        <h2 className="blog_heading" id="final">
          Final Thoughts
        </h2>
        After all, was it worth it? I would say 100%. In hindsight, looking back at my Java knowledge prior to taking
        the OCP exam, I would say that now I know that I didn't know anything. Wherever this puts me (in the past and
        today) on the 'Mount Stupid' graph or the{" "}
        <a href="https://en.wikipedia.org/wiki/Dunning%E2%80%93Kruger_effect" target="_blank">
          Dunning-Kruger effect
        </a>{" "}
        is something I’ll have to think about in the future. The exam is — as everyone who takes it says in forums and
        blogs — really difficult, but I am quite sure I will try to complete the OCP 25 whenever it comes out. This
        seems like a good way to really understand all the new features implemented. I am happy my collegue asked me to
        do this exam and motivated me whenever I had motivation issues. Thank you! I would not agree with the AI saying
        that I personally have now reached an 'elite level of mastery in the Java language', but I definitely improved a
        lot. When it comes to my daily work, I haven't encountered Java concepts I did not know and fully understand in
        a long time. <br />A few weeks ago, I was assigned the <i>privilege</i> to maintain a legacy Java 8 project
        waiting for its final coffin dance. It contained all kinds of retired Java features, all of which I was familiar
        with. Additionally, I found lots of implementations which can be improved. If this conclusion changes, I will
        update it in the future. To whoever reads this and is currently studying for their own OCP exam: Good luck, you
        got this! <br />
        <br />
        Thank you for reading this blog. Please share your thoughts, comments and ideas using the{" "}
        <Link to="/kontakt">contact options</Link> on this website. <br />
        <Divider />
        <b>Question 5: What is the output of this code?</b>
        <SyntaxHighlighter showLineNumbers wrapLongLines="true" className="blog-code" language="java">
          {question5}
        </SyntaxHighlighter>
        <Collapse defaultActiveKey={["1"]} ghost>
          <Panel header="See Results and Explaination" key="0">
            <div className="blog_code">
              0
              <br />
              <br />
              Did you see it? The stream may be long and look complicated, but it lacks a terminal operation. Since Java
              Streams are evaluated lazily, this stream is not executed at all. Note that if a terminal operation were
              added, the parallel stream would not cause any issues because an AtomicInteger is used. In that case, it
              would result in a count of 400.
            </div>
          </Panel>
        </Collapse>
        <br />
      </div>
      <Footer />
    </div>
  );
};

export default OCP21;
