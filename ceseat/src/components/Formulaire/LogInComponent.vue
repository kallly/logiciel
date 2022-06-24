<!-- <Template>
    </v-container>
    <Div class="LogInComponent">
        <H1>Login</H1>
        <Input Type="Text" Name="Username" V-Model="Input.Username" Placeholder="Username" />
        <Input Type="Password" Name="Password" V-Model="Input.Password" Placeholder="Password" />
        <Button Type="Button" V-On:click="Login()">Login</Button>
    </Div>
    </v-container>
</Template>
<script lang="ts">

export default Vue.extend({
  name: 'navbar'
});
</script>
<Script lang="ts">   
    import Vue from 'vue';
    export default Vue.extend({
        Name: 'LogInComponent',
        Data() {
            Return {
                Input: {
                    Username: "",
                    Password: ""
                }
            }
        },
        Methods: {
            Login() {
                If(This.Input.Username != "" && This.Input.Password != "") {
                    If(This.Input.Username == This.$Parent.MockAccount.Username && This.Input.Password == This.$Parent.MockAccount.Password) {
                        This.$Emit("Authenticated", True);
                        This.$Router.Replace({ Name: "Secure" });
                    } Else {
                        Console.Log("The Username And / Or Password Is Incorrect");
                    }
                } Else {
                    Console.Log("A Username And Password Must Be Present");
                }
            }
        }
    });
</Script>

<Style Scoped>
    #Login {
        Width: 500px;
        Border: 1px Solid #CCCCCC;
        Background-Color: #FFFFFF;
        Margin: Auto;
        Margin-Top: 200px;
        Padding: 20px;
    }
</Style> -->